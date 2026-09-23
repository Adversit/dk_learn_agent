window.JOURNEY_DATA = {
  project: {title:'从零搭建 Agent', subtitle:'一张持续演进的架构图，一份诚实的学习记录。', status:'01 · 工具机制已整理，系统未运行'},
  themes:[
    {id:'workbench',number:'02',name:'AI 工作台',english:'Agent Workbench',mood:'精密 · 工程化',signature:'命令面板 · ⌘K',color:'#65e6c4'},
    {id:'minimal',number:'01',name:'极简研究手册',english:'Quiet Minimal',mood:'克制 · 理性',signature:'滚动聚焦',color:'#2d6a5f'},
    {id:'blueprint',number:'03',name:'科幻蓝图',english:'Sci-Fi Blueprint',mood:'精确 · 未来',signature:'工程图修订',color:'#7de2ff'},
    {id:'arcane',number:'04',name:'魔幻秘典',english:'Arcane Codex',mood:'知识 · 探索',signature:'能力解锁',color:'#d8b36a'},
    {id:'cyberpunk',number:'05',name:'赛博霓虹',english:'Cyberpunk Neon',mood:'锋利 · 夜间',signature:'执行流重放',color:'#00f0d0'},
    {id:'spatial',number:'06',name:'空间玻璃',english:'Spatial Glass',mood:'轻盈 · 层次',signature:'空间聚焦',color:'#77d7ff'},
    {id:'brutalist',number:'07',name:'新粗野主义',english:'Neo-Brutalist',mood:'实验 · 直接',signature:'白板贴入',color:'#ff6b5f'},
    {id:'swiss',number:'08',name:'瑞士编辑设计',english:'Swiss Editorial',mood:'严谨 · 出版',signature:'架构图版',color:'#e43d30'},
    {id:'terminal',number:'09',name:'复古终端',english:'Retro Terminal',mood:'开发者 · 可玩',signature:'本地命令行',color:'#78f29c'},
    {id:'kinetic',number:'10',name:'动态实验室',english:'Kinetic 3D Lab',mood:'空间 · 沉浸',signature:'视角聚焦',color:'#7be7d0'}
  ],
  stages:[{id:'00',title:'Agent 的定义与最小循环',goal:'理解由 LLM 驱动的工具调用闭环',status:'learning',summary:'已整理定义、个人理解与最小循环伪代码；还没有运行实现或验证结果。',nodes:['input','model','tool','tool_result','result'],added:[],changed:[],removed:[],record:{problem:'什么使一次 LLM 对话成为 Agent？最小循环需要哪些步骤？',input:'对照 Anthropic、LangChain、OpenAI Agents SDK 和 Google ADK 的公开定义，整理自己的理解、流程图与 Python 伪代码。',discussion:'四种定义分别强调动态决策、模型与工具的循环、配置与运行行为、面向目标的自主行动。这些是不同侧重点的概括。',decision:'我把 Agent 理解为：在与 LLM 对话的基础上，能够调用外部工具，对外部环境产生反馈，根据反馈进行规划，同时拥有记忆存储机制。',change:'最小画布采用 User → LLM；LLM 不需要工具时返回最终结果，需要时调用 Tool，把 Tool Result 放回上下文后再次调用 LLM。',implementation:'已写出说明最小循环的 Python 伪代码；call_llm 和 run_tool 仍是抽象接口，尚未写成可运行程序。',validation:'尚未运行代码或给出测试结果。',open:'下一步确定一个具体任务和工具，实现可运行的最小循环；再讨论错误处理、终止条件、持久化记忆与规划。',learned:'Agent 最底层可以从 LLM 驱动的工具调用与反馈循环理解。当前 messages 保存了本次循环的上下文，但还不是跨会话的持久化记忆。'}},
    {id:'01',title:'模型的工具',goal:'理解 Tool 从简单函数到受控执行能力的设计',status:'research',summary:'结合静态 IP 配置经历，整理 Read、Edit、Bash 的工具链和工具地图；尚无作者自行实现或运行验证。',nodes:['model','tool_call','tool_gate','read','edit','bash','tool_result'],added:['tool_call','tool_gate','read','edit','bash'],changed:['tool','tool_result'],removed:[],record:{problem:'能否让 LLM 自己执行操作、观察结果，再判断下一步？',input:'作者提供的 stage1-agent-tools.zip：总述、学习路线、Read／Edit／Bash 的完整执行链、关键源码摘录及其他工具地图。起点是配置服务器静态 IP 时人工执行命令并把结果复制回 ChatGPT 的经历。',discussion:'资料将工具概括为 LLM 与外部世界之间的可执行接口；对照多家工具定义，并以 Claude Code 的学习摘录观察输入 Schema、校验、Hook、权限、执行、结果与错误回灌。',decision:'先研究 Read、Edit、Bash：它们分别代表获取外部状态、修改外部状态与执行通用系统操作。将权限判定和沙箱资源边界分开解释。',change:'在 REV 00 的抽象 Tool 位置展开 Tool Call → 检查与权限 → Read／Edit／Bash → Tool Result → LLM。基础循环不变，REV 01 细化工具内部，不代表已有可运行 Agent。',implementation:'产出学习笔记、链路图、工具分类和源码摘录；尚未提供作者独立编写并运行的 Agent Tool 实现。',validation:'已核对资料包内部的知识结构与图示；没有作者工具调用日志、运行测试或生产验证。',open:'下一步挑选一个具体任务，写出最小可运行 Tool 与 Agent Loop，实测失败回灌、权限和终止条件。',learned:'Tool 不是裸函数，还要处理输入约束、权限、状态、执行环境、输出和错误反馈；Read 控制可见信息，Edit 保护旧状态，Bash 约束高自由度命令。'}}],
  toolStudy:{reason:'配置服务器静态 IP 时，我负责执行命令并把结果复制给 ChatGPT；我希望让模型直接执行、观察并继续判断。',definition:'Tool 是 LLM 与外部世界之间的可执行接口。',boundary:'工具本身负责 Schema、输入校验、执行与输出整理；运行框架负责 Hook、权限、调度、错误回灌和再次调用模型。',layers:['Tool Call','Input Schema','Tool 校验','PreToolUse','Permission','Execute','Result / Error','PostToolUse / Failure','LLM'],cards:[{id:'read',title:'Read',kind:'获取状态',question:'如何控制读取范围和上下文成本？',steps:['file_path / offset / limit / pages','校验与读取权限','按范围读取大文件','大小与 Token 预算','mtime / 同范围去重','结果或错误回灌'],detail:'Read 控制模型看见外部信息的范围与形式。资料中的 Claude Code 摘录还讨论二进制文件、设备文件和不同类型文件的处理。'},{id:'edit',title:'Edit',kind:'修改状态',question:'怎样保证修改基于模型读过的版本？',steps:['Read 记录 content / mtime','old_string 匹配与唯一性','执行前权限判断','写入前再次检查状态','生成 patch 并写盘','更新 readFileState'],detail:'Edit 关注读后文件被修改的冲突，使用 Read-before-Edit、mtime 和写入前二次检查来保护旧状态。'},{id:'bash',title:'Bash',kind:'系统操作',question:'如何约束高自由度的命令？',steps:['命令结构解析与校验','只读分类与权限决策','决定沙箱资源边界','前台或后台执行','超时与输出上限','结果或错误回灌'],detail:'Permission 决定动作是否允许；Sandbox 决定允许后可访问哪些资源。命令包含管道、重定向等复合结构，不能只看开头。'}],other:'FileWrite、Glob、Grep、WebFetch、WebSearch、MCP、AgentTool、Task 与计划工具等是后续地图，不表示本阶段都已实现。'},
  definitions:[
    {name:'Anthropic',label:'Building Effective Agents',summary:'LLM 动态决定执行过程与工具使用方式。',url:'https://www.anthropic.com/engineering/building-effective-agents'},
    {name:'LangChain',label:'Agents',summary:'模型循环调用工具，直到给定任务完成。',url:'https://docs.langchain.com/oss/python/langchain/agents'},
    {name:'OpenAI',label:'Agents SDK',summary:'Agent 是配置了指令、工具及可选运行行为的 LLM。',url:'https://openai.github.io/openai-agents-python/agents/'},
    {name:'Google ADK',label:'Agents',summary:'Agent 是为实现特定目标而自主行动的执行单元。',url:'https://google.github.io/adk-docs/agents/'}
  ],
  insight:'Agent 就是在与 LLM 对话的基础上，可以调用外部工具，对外部环境产生反馈，并根据反馈进行规划，同时拥有记忆存储机制。',
  takeaway:'Agent 最底层，本质上就是一个由 LLM 驱动、能够调用工具并根据结果继续循环的系统。',
  code:`messages = [
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
        })`,
  nodes:[
    {id:'input',title:'User',type:'输入',role:'提出任务并提供上下文',why:'循环需要用户目标与初始消息。',inputs:'用户任务',outputs:'role=user 消息',change:'最小循环的起点',verify:'待可运行实现验证',x:20,y:100},
    {id:'model',title:'LLM',type:'决策核心',role:'决定返回答案或请求工具调用',why:'模型根据已有消息及工具描述选择下一步。',inputs:'messages、tools',outputs:'回答或 tool_calls',change:'每次工具结果写回后再次调用',verify:'待可运行实现验证',x:290,y:100},
    {id:'tool',title:'Tool',type:'外部能力',role:'执行模型请求的外部操作',why:'让系统读取或改变外部环境。',inputs:'tool_call.name、arguments',outputs:'工具执行结果',change:'仅在 LLM 需要时调用',verify:'待可运行实现验证',x:530,y:280},
    {id:'tool_result',title:'Tool Result',type:'反馈',role:'把工具执行结果放回上下文',why:'模型需要看到反馈，才能继续判断下一步。',inputs:'工具输出、tool_call.id',outputs:'role=tool 消息',change:'写入 messages，再次调用 LLM',verify:'待可运行实现验证',x:790,y:280},
    {id:'result',title:'Final Answer',type:'输出',role:'模型不再请求工具时返回结果',why:'明确循环的结束分支。',inputs:'没有 tool_calls 的模型响应',outputs:'response.content',change:'满足终止条件后返回用户',verify:'待可运行实现验证',x:790,y:100},
    {id:'agent',title:'Agent',type:'系统概念',role:'由模型、工具与控制循环构成的系统',why:'用整体视角理解动态选择、工具调用和反馈。',inputs:'目标、消息、工具配置',outputs:'最终结果或下一步动作',change:'概念解释，不是画布上的额外执行节点',verify:'当前只完成知识整理',x:290,y:100},
    {id:'tool_call',title:'Tool Call',type:'调用请求',role:'模型选择工具名称与输入参数',why:'把模型意图转成可检查的调用。',inputs:'工具名、参数',outputs:'待校验请求',change:'REV 01 新增对调用入口的解释',verify:'仅资料研究，未运行',x:245,y:185},
    {id:'tool_gate',title:'Tool Guard',type:'执行边界',role:'组合 Schema、校验、Hook 和权限判定',why:'让请求在执行前受到约束。',inputs:'工具请求、规则与运行环境',outputs:'允许、拒绝或错误',change:'REV 01 新增受控执行链',verify:'仅资料研究，未运行',x:490,y:185},
    {id:'read',title:'Read',type:'读取',role:'获取外部文件状态并控制输出范围',why:'避免过量内容塞满上下文。',inputs:'路径、范围、页码等',outputs:'受预算约束的内容或错误',change:'REV 01 从抽象 Tool 展开',verify:'学习摘录，未自行实现',x:735,y:35},
    {id:'edit',title:'Edit',type:'修改',role:'根据已读取的文件版本安全修改内容',why:'防止读后文件变更造成覆盖或歧义。',inputs:'文件路径、old_string、new_string',outputs:'patch、写入结果或冲突错误',change:'REV 01 从抽象 Tool 展开',verify:'学习摘录，未自行实现',x:735,y:185},
    {id:'bash',title:'Bash',type:'执行',role:'在权限与沙箱边界内执行命令',why:'控制通用 shell 能力的风险与输出。',inputs:'命令、超时、后台设置',outputs:'stdout、stderr、退出状态或错误',change:'REV 01 从抽象 Tool 展开',verify:'学习摘录，未自行实现',x:735,y:335}
  ],
  edges:[{source:'input',target:'model',relation:'data',label:'任务'},{source:'model',target:'result',relation:'final',label:'无需 Tool → 返回'},{source:'model',target:'tool',relation:'call',label:'需要 Tool'},{source:'tool',target:'tool_result',relation:'feedback',label:'执行结果'},{source:'tool_result',target:'model',relation:'loop',label:'放回上下文，再次调用'}],
  toolEdges:[{source:'model',target:'tool_call',relation:'call',label:'选择'},{source:'tool_call',target:'tool_gate',relation:'data',label:'校验'},{source:'tool_gate',target:'read',relation:'call',label:'读'},{source:'tool_gate',target:'edit',relation:'call',label:'改'},{source:'tool_gate',target:'bash',relation:'call',label:'执行'},{source:'read',target:'tool_result',relation:'feedback',label:''},{source:'edit',target:'tool_result',relation:'feedback',label:''},{source:'bash',target:'tool_result',relation:'feedback',label:''},{source:'tool_result',target:'model',relation:'loop',label:'反馈'}]
};
