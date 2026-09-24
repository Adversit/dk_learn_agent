# 第一部分：模型的工具

## 1. 为什么需要工具？

我曾经在 ChatGPT 里询问如何配置服务器的静态 IP。整个过程几乎都是：**它给我命令，我去执行，再把结果贴回来，由它判断下一步。**

在这条链路里，我承担了不少机械的执行和搬运工作。那么，能不能让 LLM 直接获得执行结果，并继续完成任务，而不必每一步都由我来中转？

这就是我理解的“给聊天模型加上手”——**工具**。Codex 已经能读取文件、修改代码和运行命令；背后并不是模型亲自执行代码，而是模型提出调用请求，由运行环境执行，再把结果交回模型。([OpenAI Developers](https://developers.openai.com/codex/cli/))

但“能执行”和“可靠地执行”是两回事。只看最基础的三个工具，就有不少问题：Read 面对巨大的日志文件，应该一次读多少？Edit 修改时，文件已经不同于刚才读取的版本，该怎么办？Bash 又该如何避免误删文件等危险操作？

因此，**工具可以从一个函数开始，但可靠的工具设计不止这个函数，还包括它的执行约束。**这些约束不急着一次做完，我们先从最小版本出发，遇到问题，再逐步补上。

## 2. 什么是工具？四家官方文档的表述

*以下为官方文档要点的中文转述，并非逐字引用。*

| 来源 | 对工具的表述 |
| --- | --- |
| **Anthropic / Claude** | 模型可以调用开发者定义或平台提供的功能；模型生成结构化调用，由应用或平台执行。([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)) |
| **OpenAI** | 工具是提供给模型使用的能力；工具调用是模型使用该能力的请求，工具结果则是执行后返回给模型的信息。([OpenAI Developers](https://developers.openai.com/api/docs/guides/function-calling)) |
| **LangChain** | 工具是具有明确输入、输出的可调用函数，模型根据上下文决定何时调用，以及传入什么参数。([Docs by LangChain](https://docs.langchain.com/oss/python/langchain/tools)) |
| **Google ADK** | 工具是提供给 Agent 的特定能力，让它能够执行动作，与文本生成和推理之外的环境交互。([Google GitHub](https://google.github.io/adk-docs/tools-custom/)) |

## 3. 从 Read 开始：我们的探索路线

我们以 **Claude Code 的公开工具行为为参考**，自行实现最小版本的 Read、Edit 和 Bash。先从 Read 开始，沿着下面这条路线逐步探索，而不是一次搭好完整工具系统。

| 顺序 | 要弄清楚的问题 |
| --- | --- |
| **① 核心函数** | 先写一个读取小型测试文本的函数：输入文件路径，如何得到文件内容？ |
| **② 读取约束** | 文件太大怎么办？逐步增加起始行、读取行数和内容上限，并明确告诉模型是否读全。Claude Code 的 Read 提供了 `offset`、`limit` 和部分读取提示，可以作为参考。([Claude](https://code.claude.com/docs/en/tools-reference)) |
| **③ 接入模型** | 如何用工具名称、用途描述和参数定义，让模型知道怎样使用 Read？模型发出调用后，程序如何找到并执行对应函数？([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use)) |
| **④ 执行前检查** | 参数是否合法、路径是否允许访问？哪些检查属于工具自身，哪些适合通过 `PreToolUse` Hook 增加？([Claude](https://code.claude.com/docs/en/hooks)) |
| **⑤ 执行后处理** | 返回内容是否超长、是否需要脱敏？如何通过输出处理或 `PostToolUse` Hook，让模型拿到合适的结果？([Claude](https://code.claude.com/docs/en/hooks)) |
| **⑥ 异常反馈** | 文件不存在、权限不足、执行失败时，哪些信息交给模型调整操作，哪些由程序处理？([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)) |

### 这里先明确两个边界

**预校验不等于 Hook。**参数校验、工具自身的约束和权限控制，与 Hook 是不同机制。Hook 是在特定时机插入额外逻辑的扩展点，不是所有检查的统称。后置 Hook 也不是“撤销按钮”：它可以处理结果或提供反馈，但不能撤销已经发生的文件修改或命令执行。([Claude](https://code.claude.com/docs/en/hooks))

**错误也不应该全部原样塞给 LLM。**我们自己的最小版本，可以先采用这样的分工：

- **需要模型调整操作的错误**：例如路径不存在、读取范围不合法，返回清晰原因和可采取的下一步；权限拒绝可以告知，但不能引导模型绕过。官方工具调用协议支持将失败作为工具结果返回。([Claude Platform](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls))
- **需要运行时处理的故障**：远程工具的网络、限流问题先由程序按策略有限重试，最终失败再返回摘要。这个本地文件 Read 的最小版本不引入网络；**模型 API 自身请求失败，也不能误报成 Read 执行失败**。
- **不应直接暴露的信息**：密钥、凭证和无关内部细节不返回；必要的失败原因则应保留，避免模型误以为操作成功。这里将脱敏作为我们自己的设计要求，不能只依赖提示词。
