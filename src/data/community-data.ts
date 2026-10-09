export interface TechStackDirection {
  id: string
  title: string
  subtitle: string
  category: string
  badge: string
  accentColor: string
  glowColor: string
  description: string
  highlights: string[]
  coreTechnologies: string[]
  curriculum: {
    phase: string
    title: string
    detail: string
  }[]
  productionPractices: string[]
  architecturePreview: {
    nodes: string[]
    connections: string[]
  }
}

export interface IncubatorProject {
  id: string
  title: string
  tagline: string
  category: 'AI & Agent' | 'Fullstack' | 'Systems' | 'Design System'
  status: '生产实战中' | '开源共建' | '孵化中'
  stars?: number
  forks?: number
  contributors: number
  description: string
  techs: string[]
  repoUrl?: string
  highlights: string[]
}

export interface MutualAidPillar {
  number: string
  title: string
  subtitle: string
  tag: string
  description: string
  details: string[]
  iconName: string
}

export interface FAQItem {
  question: string
  answer: string
}

export const COMMUNITY_INFO = {
  name: '格物书院',
  nameEn: 'GEWU ACADEMY',
  motto: '穷理而格物 · 知行以致远',
  mottoTranslation: 'Seeking Truth through Deep Inquiry · Bridging Knowledge and Resolute Action',
  subheading: '面向开发者与设计师的高质量实践社区',
  mission: '同行互帮互助，打磨硬核实战能力，消除求职与技术信息差，助力成员更好就业。',
  originStory: '「致知在格物，物格而后知至。」在技术快速迭代与就业竞争加剧的时代，格物书院由一群一线资深工程师与设计专家发起。我们拒绝纸上谈兵与浮躁套壳，坚持以真实生产级工程与开源协同为基石，通过同行互助打破技术孤岛与求职壁垒。',
  metrics: [
    { label: '核心实践方向', value: '4+', unit: '大硬核领域' },
    { label: '实战孵化工程', value: '12+', unit: '个生产级项目' },
    { label: '同行互助代码评审', value: '380+', unit: '次深度 Code Review' },
    { label: '成员高质量就业助力', value: '92%', unit: '重点内推转化' },
  ],
  maintainerContact: {
    name: 'Alkaid',
    wechat: 'Alkaid',
    region: '中国香港',
    wechatGroupNote: '备注「格物加入+方向」',
    email: 'maintainer@gewu.academy',
    githubOrg: 'https://github.com/gewu-academy',
    weeklySync: '每周日晚 20:30 在线技术圆桌与实战答辩',
    rules: [
      '保持对技术的敬畏与求真务实态度',
      '主张「代码说话」，提倡积极发起 Issue & Pull Request',
      '无私分享、彼此尊重，打破技术壁垒与信息闭塞'
    ]
  }
}

export const MUTUAL_AID_PILLARS: MutualAidPillar[] = [
  {
    number: '01',
    title: '同行互帮互助',
    subtitle: '告别孤军奋战，建立高质量技术圈层',
    tag: 'PEER SUPPORT',
    iconName: 'Users',
    description: '打破技术孤岛。每周线上结对编程、疑难 Bug 攻坚研讨、设计体验推演，同行者随时碰撞思路。',
    details: [
      '每周日晚「格物实战研讨会」深度切磋',
      '一对一 Code Review 与架构推演',
      '前沿技术早报与开源趋势一手拆解'
    ]
  },
  {
    number: '02',
    title: '打磨硬核实战',
    subtitle: '拒绝玩具 Demo，直击生产级系统架构',
    tag: 'HARDCORE ENGINEERING',
    iconName: 'Cpu',
    description: '从 Multi-Agent 编排到底层高并发系统，从设计原子系统到端到端全栈，沉淀真实生产落地资产。',
    details: [
      '涵盖高并发高可用工程落地与容灾考量',
      'Multi-Agent 复杂工作流与状态机调度',
      '真实业务场景驱动，成果可沉淀至简历与 GitHub'
    ]
  },
  {
    number: '03',
    title: '消除信息差',
    subtitle: '打破求职与行业壁垒，还原真实要求',
    tag: 'ZERO INFO GAP',
    iconName: 'Compass',
    description: '直连一线大厂、独角兽与优质出海团队的在职导师，实时同步技术评级标准、面试真题与用人需求。',
    details: [
      '一线名企与出海团队技术雷达实时同步',
      '求职避坑经验、定级标准与薪资结构透明化',
      '技术风口甄别，聚焦具备长期护城河的底层能力'
    ]
  },
  {
    number: '04',
    title: '助力成员更好就业',
    subtitle: '从作品集打磨到精准内推，全程护航',
    tag: 'CAREER ACCELERATION',
    iconName: 'TrendingUp',
    description: '将实战项目直接转化为极具说服力的 GitHub 作品集与设计 Case Study，配套资深导师模拟面试与精准内推。',
    details: [
      '简历逐行打磨与实战项目闪光点提炼',
      '全仿真技术深挖、系统设计与设计答辩模拟',
      'Maintainer 与校友网络专属直推通道'
    ]
  }
]

export const TECH_STACK_DIRECTIONS: TechStackDirection[] = [
  {
    id: 'ai-agent',
    title: 'AI & Agent 开发',
    subtitle: '大模型应用 · Multi-Agent 架构 · 工作流调度 · 工程落地',
    category: 'Intelligent Systems',
    badge: 'Frontier AI',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    description: '超越简单的 Prompt 套壳。深入探索 LLM 工具调用、记忆持久化、复杂多智能体协同网络，以及生产环境下的低延迟吞吐与自动化评测体系。',
    highlights: [
      'Multi-Agent 编排拓扑与自主决策回环',
      '企业级混合 RAG 检索（向量 + 知识图谱 + 重排序）',
      'LLM 评测监控流水线与成本延迟优化 (Evals & Observability)',
      '基于 vLLM / SGLang 的私有化量化部署工程'
    ],
    coreTechnologies: [
      'LangGraph',
      'AutoGen',
      'LlamaIndex',
      'FastAPI',
      'vLLM',
      'Milvus / Qdrant',
      'DeepEval',
      'Langfuse'
    ],
    curriculum: [
      {
        phase: 'Stage 1',
        title: 'LLM 架构底座与工程范式',
        detail: '深入理解 Transformer 推理特征、Function Calling 机制与结构化 JSON 约束输出。'
      },
      {
        phase: 'Stage 2',
        title: 'Multi-Agent 协同与状态机',
        detail: '基于有向无环图（DAG）与状态机设计多角色协同、反思纠错与长任务自愈机制。'
      },
      {
        phase: 'Stage 3',
        title: '生产级服务化与评测闭环',
        detail: '流式响应断流重试、分布式缓存、Token 吞吐审计与端到端回归评测系统。'
      }
    ],
    productionPractices: [
      'Gewu-Agent-Flow：通用多智能体异步工作流调度引擎',
      '智能代码审查与 Issue 自动分类 Agent',
      '垂直领域知识库高召回率检索增强生成 (RAG) 方案'
    ],
    architecturePreview: {
      nodes: ['User Query', 'Router Agent', 'Knowledge RAG', 'Planner Agent', 'Executor Toolset', 'Synthesizer'],
      connections: ['Query -> Router', 'Router -> RAG & Planner', 'Planner -> Toolset', 'Toolset -> Synthesizer']
    }
  },
  {
    id: 'typescript-fullstack',
    title: 'TypeScript 全栈',
    subtitle: 'TypeScript · React 19 · Next.js · Node.js / 全栈生态',
    category: 'Modern Web & Ecosystem',
    badge: 'Modern Fullstack',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.25)',
    description: '极致的端到端类型安全、现代前端工程架构与服务端渲染。打磨兼具百万级用户并发体验与极佳开发者人体工学的全栈产品。',
    highlights: [
      'React 19 Actions、RSC 与极速流式渲染 (Streaming SSR)',
      '全栈端到端强类型契约 (tRPC / Prisma / Zod / Drizzle)',
      '高性能状态流与现代 Web 交互体验架构',
      'Monorepo 架构治理 (Turborepo + pnpm / Bun) 与 CI/CD 自动化'
    ],
    coreTechnologies: [
      'TypeScript 5.x',
      'React 19',
      'Next.js 15',
      'Node.js / Bun',
      'Tailwind CSS v4',
      'tRPC',
      'Prisma',
      'TanStack Suite'
    ],
    curriculum: [
      {
        phase: 'Stage 1',
        title: 'TypeScript 核心类型元编程',
        detail: '泛型推导、条件类型、模板字面量与复杂业务类型体操实战。'
      },
      {
        phase: 'Stage 2',
        title: '现代全栈架构与服务端渲染',
        detail: 'Next.js App Router 渲染架构、Server Actions、缓存模型与海量静态增量再生 (ISR)。'
      },
      {
        phase: 'Stage 3',
        title: '极致性能与大规模工程化',
        detail: 'Web Vitals 毫秒级优化、Bundle 拆包策略、自动化测试覆盖与微前端架构。'
      }
    ],
    productionPractices: [
      '格物书院官网与知识中心 (Next.js + RSC + GSAP)',
      '全栈开源协同看板系统 (tRPC + PostgreSQL + WebSocket)',
      '高复用业务组件库与自动化文档平台'
    ],
    architecturePreview: {
      nodes: ['Client UI', 'RSC Boundary', 'Server Action', 'tRPC Router', 'ORM Layer', 'Database'],
      connections: ['Client -> RSC', 'RSC -> Server Action', 'Action -> tRPC', 'tRPC -> ORM -> DB']
    }
  },
  {
    id: 'systems-engineering',
    title: '多语言全栈与系统工程',
    subtitle: 'Golang · Rust · Python 后端服务 · 高并发架构',
    category: 'Backend & High Concurrency',
    badge: 'Core Infrastructure',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    description: '直面底层性能极限与海量并发挑战。掌握内存安全、协程高并发调度、分布式共识协议与生产环境高可用容灾架构。',
    highlights: [
      'Golang 万级高并发微服务与轻量协程调度工程',
      'Rust 内存安全、零成本抽象与高性能系统级扩展组件',
      'Python 异步高性能服务与数据流处理管道',
      '分布式事务 (Saga / TCC)、分布式锁与 Kafka / Pulsar 消息总线'
    ],
    coreTechnologies: [
      'Golang 1.23+',
      'Rust / Tokio',
      'Python / FastAPI',
      'gRPC / Protobuf',
      'Kafka / Redis',
      'PostgreSQL',
      'Docker / K8s',
      'OpenTelemetry'
    ],
    curriculum: [
      {
        phase: 'Stage 1',
        title: '高并发网络模型与语言底层',
        detail: '深入 Golang GMP 调度模型、Channel 原理；Rust 所有权机制、并发安全与无畏并发。'
      },
      {
        phase: 'Stage 2',
        title: '分布式微服务治理与高可用',
        detail: '服务发现、熔断降级、限流排队、分布式链路追踪与高性能序列化协议对比。'
      },
      {
        phase: 'Stage 3',
        title: '系统级压测与极限调优',
        detail: 'CPU / 内存 Profile 分析、GC 调优、零拷贝技术与生产环境突发流量容灾演练。'
      }
    ],
    productionPractices: [
      'Gewu-MQ：轻量级高性能异步消息队列原型',
      '分布式限流网关 (Golang + Redis Token Bucket)',
      '基于 Rust 的向量检索引擎底层扩展与 WASM 模块'
    ],
    architecturePreview: {
      nodes: ['Edge Gateway', 'Auth Service', 'gRPC Dispatcher', 'Rust Worker Engine', 'Kafka Bus', 'Storage Cluster'],
      connections: ['Gateway -> Auth', 'Auth -> Dispatcher', 'Dispatcher -> Rust Engine', 'Engine -> Kafka -> Storage']
    }
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX 设计与体验架构',
    subtitle: '产品交互设计 · 体验架构 · 原型输出 · 设计系统',
    category: 'Experience & Aesthetics',
    badge: 'Design System',
    accentColor: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.25)',
    description: '连接美学直觉与工程逻辑。不仅输出像素级优雅的界面，更从业务目标、用户心智、设计规范与研发闭环出发构建卓越的数字产品。',
    highlights: [
      '企业级 Design System 架构与 Figma Variables 变量系统',
      '透明液态玻璃、空间深度感与现代前沿微动效规范',
      'B 端复杂业务逻辑的信息架构 (IA) 与交互减熵设计',
      '设计到代码的无缝交付 (Design-to-Code Workflow)'
    ],
    coreTechnologies: [
      'Figma / FigJam',
      'Design Tokens',
      'GSAP / Framer Motion',
      'Tailwind CSS',
      'Accessibility (WCAG 2.1)',
      'Design Systems',
      'Component Architecture',
      'Prototyping'
    ],
    curriculum: [
      {
        phase: 'Stage 1',
        title: '现代视觉语言与设计系统基石',
        detail: '网格律动、色彩拓扑、流体玻璃质感设计、字体排印与无障碍适配规范。'
      },
      {
        phase: 'Stage 2',
        title: '交互架构与复杂业务体验减熵',
        detail: '用户旅程推演、复杂表单与数据密度优化、状态机驱动的高保真交互原型。'
      },
      {
        phase: 'Stage 3',
        title: '研发协同闭环与动效工程落地',
        detail: '从设计规范到前端代码的 Tokens 自动化，编写具备工程可行性的交互动效参数。'
      }
    ],
    productionPractices: [
      '格物设计系统 (Gewu Design System - GDS)：含 40+ 沉浸式液态玻璃组件',
      '开发者生产力工作台高保真交互设计',
      'AI 交互设计范式与智能助手沉浸式体验规范'
    ],
    architecturePreview: {
      nodes: ['Design Tokens', 'Figma Library', 'Sync Pipeline', 'React UI Kit', 'Theme Engine', 'Production App'],
      connections: ['Tokens -> Figma', 'Figma -> Sync Pipeline', 'Pipeline -> React UI Kit', 'Kit -> Theme Engine -> App']
    }
  }
]

export const INCUBATOR_PROJECTS: IncubatorProject[] = [
  {
    id: 'gewu-agent-flow',
    title: 'Gewu Agent Flow',
    tagline: '可视化多智能体工作流编排与分布式执行系统',
    category: 'AI & Agent',
    status: '生产实战中',
    stars: 124,
    forks: 38,
    contributors: 18,
    description: '支持复杂有向图（DAG）调度的生产级 Multi-Agent 框架，具备内存快照、长周期任务中断恢复与全链路可观测性。',
    techs: ['Python', 'FastAPI', 'LangGraph', 'TypeScript', 'Next.js', 'React Flow'],
    highlights: ['可视化拖拽编排', '支持本地量化推理引擎', '自动化 Eval 评测套件']
  },
  {
    id: 'gewu-design-system',
    title: 'Gewu Liquid Glass DS',
    tagline: '极简透明液态玻璃与高交互现代设计系统',
    category: 'Design System',
    status: '开源共建',
    stars: 206,
    forks: 45,
    contributors: 12,
    description: '融合东方书院意境与未来液态磨砂拟物感的组件库与设计规范，提供开箱即用的 Figma 库与 React/Tailwind 实现。',
    techs: ['React 19', 'Tailwind CSS v4', 'GSAP', 'Figma Tokens', 'Radix Primitives'],
    highlights: ['3D 折射玻璃滤镜', '物理阻尼动效预设', '深浅色多层自适应']
  },
  {
    id: 'gewu-core-engine',
    title: 'Gewu High-Q Engine',
    tagline: '高并发异步事件总线与轻量任务分发网关',
    category: 'Systems',
    status: '开源共建',
    stars: 98,
    forks: 26,
    contributors: 9,
    description: '采用 Golang 与 Rust 混合架构的高性能分发引擎，专注于千万级实时长连接信令推送与任务原子消费。',
    techs: ['Golang', 'Rust', 'Tokio', 'gRPC', 'Redis', 'Docker'],
    highlights: ['P99 延迟低于 3ms', '零内存泄漏测试', '完善的 Prometheus 监控仪表盘']
  },
  {
    id: 'gewu-interview-radar',
    title: 'Gewu Radar & Career Hub',
    tagline: '真实技能雷达对齐与求职信息差消除平台',
    category: 'Fullstack',
    status: '生产实战中',
    stars: 175,
    forks: 52,
    contributors: 21,
    description: '汇总一线大厂与出海团队真实招聘需求与面试技术雷达，支持模拟题库协同共创与成员简历复盘。',
    techs: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    highlights: ['真实求职避坑数据库', '技能树量化评估', '导师一对一评审流']
  }
]

export const FAQ_LIST: FAQItem[] = [
  {
    question: '加入格物书院需要什么条件？有基础门槛吗？',
    answer: '我们欢迎真正热爱技术、尊重开源、渴望提升硬核实战能力的开发者与设计师。无论你是高校在读、寻找实习，还是在职渴望技术进阶或转换赛道，只要你愿意保持「穷理而格物」的钻研心态，并能投入时间参与共建，书院都有适合你的梯队。'
  },
  {
    question: '书院如何帮助成员打磨硬核能力并更好就业？',
    answer: '我们拒绝形式主义。第一，通过真实生产级项目和开源仓库，让成员深度参与系统设计与核心代码编写，积累高质量的 GitHub Commit；第二，一线在职导师定期开展 Code Review、简历逐行打磨与架构答辩模拟；第三，整合一线名企与优质出海团队的内推资源，直接递送至业务 Leader。'
  },
  {
    question: '如何参与贡献并提交 Issue 或 Pull Request？',
    answer: '欢迎前往组织 GitHub 查看各个孵化项目的 Issue 列表，寻找标记为「good first issue」或「help wanted」的任务。在提交 PR 前请阅读贡献者指南（CONTRIBUTING.md），遵从项目代码风格与 Commit 规范。每次合并都会记录在书院贡献者花名册中！'
  },
  {
    question: '如何联系组织 Maintainer 申请加入或共同协作？',
    answer: '你可以点击页面上的「联系 Maintainer」按钮，添加微信或发送邮件。请注明「姓名/昵称 + 擅长或专注的技术方向 + 加入书院初衷」，Maintainer 将在 24 小时内与你取得联系并邀请你进入书院核心交流群。'
  }
]
