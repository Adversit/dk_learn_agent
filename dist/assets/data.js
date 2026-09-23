window.JOURNEY_DATA = {
  project: {title:'从零搭建 Agent', subtitle:'一张持续演进的架构图，一份诚实的学习记录。', status:'构想阶段 · 尚未实现'},
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
  stages:[{id:'00',title:'最小架构构想',goal:'为后续讨论建立共同起点',status:'concept',summary:'这是用于讨论的概念图，不代表已实现或验证。第一阶段的实际搭建顺序由后续总结确定。',nodes:['input','agent','model','tool','result'],added:[],changed:[],removed:[],record:{problem:'如何从一个足够小的闭环开始理解 Agent？',input:'项目目标：从零搭建，并记录每一步的设计、实现与验证。',discussion:'尚未开始第一阶段对话。',decision:'暂以五个概念模块作为讨论起点；具体架构待实际探索确定。',change:'建立概念画布，尚无已实现的架构变更。',implementation:'未实现。',validation:'未验证。',open:'待确定第一个任务、最小可运行标准与技术选择。',learned:'待第一阶段完成后填写。'}}],
  nodes:[
    {id:'input',title:'用户输入',type:'入口',role:'提出任务与提供上下文',why:'让系统知道要解决什么问题。',inputs:'任务描述、必要上下文',outputs:'可供 Agent 理解的请求',change:'概念起点，未实现',verify:'待第一阶段定义',x:54,y:190},
    {id:'agent',title:'Agent',type:'决策',role:'理解目标并决定下一步',why:'组织模型与外部能力形成任务闭环。',inputs:'请求与上下文',outputs:'动作选择或回答',change:'概念起点，未实现',verify:'待第一阶段定义',x:352,y:190},
    {id:'model',title:'模型',type:'能力',role:'理解、推理和生成',why:'为 Agent 的决策提供语言智能。',inputs:'提示与上下文',outputs:'模型响应',change:'概念起点，未选型',verify:'待第一阶段定义',x:342,y:28},
    {id:'tool',title:'工具',type:'外部能力',role:'连接数据和动作',why:'当任务需要外部信息或执行时引入。',inputs:'调用参数',outputs:'调用结果或错误',change:'仅为备选能力，尚未引入',verify:'待实际需要时定义',x:650,y:42},
    {id:'result',title:'结果',type:'输出',role:'交付回答或执行结果',why:'让任务结果对用户可见、可检验。',inputs:'Agent 的最终输出',outputs:'用户可见结果',change:'概念起点，未实现',verify:'待第一阶段定义',x:665,y:190}
  ],
  edges:[{source:'input',target:'agent',relation:'data',label:'请求'},{source:'agent',target:'result',relation:'data',label:'返回'},{source:'agent',target:'model',relation:'call',label:'调用'},{source:'agent',target:'tool',relation:'call',label:'按需'}]
};
