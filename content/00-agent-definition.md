# 第 0 部分：Agent 的定义与最小循环

状态：**知识整理已完成；代码为伪代码，尚未运行或验证。**

## 来源定义（中文概括）

| 来源 | 概括 | 官方资料 |
| --- | --- | --- |
| Anthropic | LLM 动态决定执行过程和工具使用方式。 | [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) |
| LangChain | 模型循环调用工具，直到任务完成。 | [Agents](https://docs.langchain.com/oss/python/langchain/agents) |
| OpenAI Agents SDK | Agent 是配置了指令、工具和可选运行行为的 LLM。 | [Agents](https://openai.github.io/openai-agents-python/agents/) |
| Google ADK | Agent 是为了实现特定目标而自主行动的执行单元。 | [Agents](https://google.github.io/adk-docs/agents/) |

以上为理解后的概括，不是逐字引文。

## 我的理解

> Agent 就是在与 LLM 对话的基础上，可以调用外部工具，对外部环境产生反馈，并根据反馈进行规划，同时拥有记忆存储机制。

这是我的第一个 Agent 知识点。这个理解包含了我希望逐步加入的规划与记忆能力；下面的最小循环只体现当前消息上下文与工具反馈，尚未包含跨会话的持久化记忆或独立规划模块。

## 最小 Agent Loop

```text
调用 LLM
   ↓
是否需要 Tool？
   ├─ 否 → 返回结果
   └─ 是 → 执行 Tool → 获得 Tool Result → 放回上下文 → 再次调用 LLM ↺
```

```python
messages = [
    {"role": "user", "content": user_input}
]

while True:
    response = call_llm(messages, tools=tools)
    messages.append(response)

    if not response.tool_calls:
        return response.content

    for tool_call in response.tool_calls:
        result = run_tool(
            tool_call.name,
            tool_call.arguments
        )

        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": str(result)
        })
```

`call_llm` 与 `run_tool` 是抽象接口；这段代码用于说明控制流，不宣称已经可运行。错误处理、最大迭代次数、工具权限、终止策略与持久化机制留待后续阶段。

## 当前最小架构

User → LLM → 若无需 Tool，返回 Final Answer；若需要，Tool → Tool Result → 写回 messages → LLM ↺。

> Agent 最底层，本质上就是一个由 LLM 驱动、能够调用工具并根据结果继续循环的系统。

## 下一步

选定一个具体任务和至少一个工具，将伪代码实现为可运行的最小循环，并记录成功、失败与终止条件。第一阶段仍待开始。
