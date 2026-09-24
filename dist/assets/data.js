window.JOURNEY_DATA = {
  "project": {
    "title": "从零搭建 Agent",
    "subtitle": "一张持续演进的架构图，一份诚实的学习记录。",
    "status": "第 0 阶段已整理 · 第 1 阶段持续更新"
  },
  "themes": [
    {
      "id": "workbench",
      "number": "02",
      "name": "AI 工作台",
      "english": "Agent Workbench",
      "mood": "精密 · 工程化",
      "signature": "命令面板 · ⌘K",
      "color": "#65e6c4"
    },
    {
      "id": "minimal",
      "number": "01",
      "name": "极简研究手册",
      "english": "Quiet Minimal",
      "mood": "克制 · 理性",
      "signature": "滚动聚焦",
      "color": "#2d6a5f"
    },
    {
      "id": "blueprint",
      "number": "03",
      "name": "科幻蓝图",
      "english": "Sci-Fi Blueprint",
      "mood": "精确 · 未来",
      "signature": "工程图修订",
      "color": "#7de2ff"
    },
    {
      "id": "arcane",
      "number": "04",
      "name": "魔幻秘典",
      "english": "Arcane Codex",
      "mood": "知识 · 探索",
      "signature": "能力解锁",
      "color": "#d8b36a"
    },
    {
      "id": "cyberpunk",
      "number": "05",
      "name": "赛博霓虹",
      "english": "Cyberpunk Neon",
      "mood": "锋利 · 夜间",
      "signature": "执行流重放",
      "color": "#00f0d0"
    },
    {
      "id": "spatial",
      "number": "06",
      "name": "空间玻璃",
      "english": "Spatial Glass",
      "mood": "轻盈 · 层次",
      "signature": "空间聚焦",
      "color": "#77d7ff"
    },
    {
      "id": "brutalist",
      "number": "07",
      "name": "新粗野主义",
      "english": "Neo-Brutalist",
      "mood": "实验 · 直接",
      "signature": "白板贴入",
      "color": "#ff6b5f"
    },
    {
      "id": "swiss",
      "number": "08",
      "name": "瑞士编辑设计",
      "english": "Swiss Editorial",
      "mood": "严谨 · 出版",
      "signature": "架构图版",
      "color": "#e43d30"
    },
    {
      "id": "terminal",
      "number": "09",
      "name": "复古终端",
      "english": "Retro Terminal",
      "mood": "开发者 · 可玩",
      "signature": "本地命令行",
      "color": "#78f29c"
    },
    {
      "id": "kinetic",
      "number": "10",
      "name": "动态实验室",
      "english": "Kinetic 3D Lab",
      "mood": "空间 · 沉浸",
      "signature": "视角聚焦",
      "color": "#7be7d0"
    }
  ],
  "stages": [
    {
      "id": "00",
      "title": "Agent 的定义与最小循环",
      "goal": "理解由 LLM 驱动的工具调用闭环",
      "status": "learning",
      "summary": "已整理定义、个人理解与最小循环伪代码；还没有运行实现或验证结果。",
      "nodes": [
        "input",
        "model",
        "tool",
        "tool_result",
        "result"
      ],
      "added": [],
      "changed": [],
      "removed": [],
      "record": {
        "problem": "什么使一次 LLM 对话成为 Agent？最小循环需要哪些步骤？",
        "input": "对照 Anthropic、LangChain、OpenAI Agents SDK 和 Google ADK 的公开定义，整理自己的理解、流程图与 Python 伪代码。",
        "discussion": "四种定义分别强调动态决策、模型与工具的循环、配置与运行行为、面向目标的自主行动。这些是不同侧重点的概括。",
        "decision": "我把 Agent 理解为：在与 LLM 对话的基础上，能够调用外部工具，对外部环境产生反馈，根据反馈进行规划，同时拥有记忆存储机制。",
        "change": "最小画布采用 User → LLM；LLM 不需要工具时返回最终结果，需要时调用 Tool，把 Tool Result 放回上下文后再次调用 LLM。",
        "implementation": "已写出说明最小循环的 Python 伪代码；call_llm 和 run_tool 仍是抽象接口，尚未写成可运行程序。",
        "validation": "尚未运行代码或给出测试结果。",
        "open": "下一步确定一个具体任务和工具，实现可运行的最小循环；再讨论错误处理、终止条件、持久化记忆与规划。",
        "learned": "Agent 最底层可以从 LLM 驱动的工具调用与反馈循环理解。当前 messages 保存了本次循环的上下文，但还不是跨会话的持久化记忆。"
      }
    },
    {
      "id": "01",
      "title": "模型的工具",
      "goal": "理解工具的职责与最小实现路线",
      "status": "partial",
      "summary": "为什么需要工具、四家官方表述，以及从 Read 开始的探索路线。Read、Edit、Bash 的具体实现待补充。",
      "nodes": [
        "input",
        "model",
        "tool",
        "tool_result",
        "result"
      ],
      "added": [],
      "changed": [
        "tool"
      ],
      "removed": []
    }
  ],
  "definitions": [
    {
      "name": "Anthropic",
      "label": "Building Effective Agents",
      "summary": "LLM 动态决定执行过程与工具使用方式。",
      "url": "https://www.anthropic.com/engineering/building-effective-agents"
    },
    {
      "name": "LangChain",
      "label": "Agents",
      "summary": "模型循环调用工具，直到给定任务完成。",
      "url": "https://docs.langchain.com/oss/python/langchain/agents"
    },
    {
      "name": "OpenAI",
      "label": "Agents SDK",
      "summary": "Agent 是配置了指令、工具及可选运行行为的 LLM。",
      "url": "https://openai.github.io/openai-agents-python/agents/"
    },
    {
      "name": "Google ADK",
      "label": "Agents",
      "summary": "Agent 是为实现特定目标而自主行动的执行单元。",
      "url": "https://google.github.io/adk-docs/agents/"
    }
  ],
  "insight": "Agent 就是在与 LLM 对话的基础上，可以调用外部工具，对外部环境产生反馈，并根据反馈进行规划，同时拥有记忆存储机制。",
  "takeaway": "Agent 最底层，本质上就是一个由 LLM 驱动、能够调用工具并根据结果继续循环的系统。",
  "code": "messages = [\n    {\"role\": \"user\", \"content\": user_input}\n]\n\nwhile True:\n    response = call_llm(messages, tools=tools)\n    messages.append(response)\n\n    if not response.tool_calls:\n        return response.content\n\n    for tool_call in response.tool_calls:\n        result = run_tool(\n            tool_call.name,\n            tool_call.arguments\n        )\n\n        messages.append({\n            \"role\": \"tool\",\n            \"tool_call_id\": tool_call.id,\n            \"content\": str(result)\n        })",
  "nodes": [
    {
      "id": "input",
      "title": "User",
      "type": "输入",
      "role": "提出任务并提供上下文",
      "why": "循环需要用户目标与初始消息。",
      "inputs": "用户任务",
      "outputs": "role=user 消息",
      "change": "最小循环的起点",
      "verify": "待可运行实现验证",
      "x": 30,
      "y": 55
    },
    {
      "id": "model",
      "title": "LLM",
      "type": "决策核心",
      "role": "决定返回答案或请求工具调用",
      "why": "模型根据已有消息及工具描述选择下一步。",
      "inputs": "messages、tools",
      "outputs": "回答或 tool_calls",
      "change": "每次工具结果写回后再次调用",
      "verify": "待可运行实现验证",
      "x": 365,
      "y": 55
    },
    {
      "id": "tool",
      "title": "Tool",
      "type": "外部能力",
      "role": "执行模型请求的外部操作",
      "why": "让系统读取或改变外部环境。",
      "inputs": "tool_call.name、arguments",
      "outputs": "工具执行结果",
      "change": "仅在 LLM 需要时调用",
      "verify": "待可运行实现验证",
      "x": 365,
      "y": 290
    },
    {
      "id": "tool_result",
      "title": "Tool Result",
      "type": "反馈",
      "role": "把工具执行结果放回上下文",
      "why": "模型需要看到反馈，才能继续判断下一步。",
      "inputs": "工具输出、tool_call.id",
      "outputs": "role=tool 消息",
      "change": "写入 messages，再次调用 LLM",
      "verify": "待可运行实现验证",
      "x": 700,
      "y": 290
    },
    {
      "id": "result",
      "title": "Final Answer",
      "type": "输出",
      "role": "模型不再请求工具时返回结果",
      "why": "明确循环的结束分支。",
      "inputs": "没有 tool_calls 的模型响应",
      "outputs": "response.content",
      "change": "满足终止条件后返回用户",
      "verify": "待可运行实现验证",
      "x": 700,
      "y": 55
    },
    {
      "id": "agent",
      "title": "Agent",
      "type": "系统概念",
      "role": "由模型、工具与控制循环构成的系统",
      "why": "用整体视角理解动态选择、工具调用和反馈。",
      "inputs": "目标、消息、工具配置",
      "outputs": "最终结果或下一步动作",
      "change": "概念解释，不是画布上的额外执行节点",
      "verify": "当前只完成知识整理",
      "x": 365,
      "y": 55
    }
  ],
  "edges": [
    {
      "source": "input",
      "target": "model",
      "relation": "data",
      "label": "用户任务"
    },
    {
      "source": "model",
      "target": "result",
      "relation": "final",
      "label": "无需工具"
    },
    {
      "source": "model",
      "target": "tool",
      "relation": "call",
      "label": "需要工具"
    },
    {
      "source": "tool",
      "target": "tool_result",
      "relation": "feedback",
      "label": "执行结果"
    },
    {
      "source": "tool_result",
      "target": "model",
      "relation": "loop",
      "label": "写回上下文，再次判断"
    }
  ],
  "nodeCaptions": {
    "input": "提出任务",
    "model": "判断下一步",
    "tool": "执行外部操作",
    "tool_result": "结果写回上下文",
    "result": "返回最终回答"
  }
};
