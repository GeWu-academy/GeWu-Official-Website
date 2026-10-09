export type Language = 'zh' | 'en'

export interface NavItem {
  label: string
  href: string
}

export interface MetricItem {
  label: string
  value: string
  unit: string
}

export interface PillarItem {
  number: string
  prefix: string
  tag: string
  title: string
  subtitle: string
  description: string
  details: string[]
  iconName: string
}

export interface TechDirectionItem {
  id: string
  seal: string
  tabLabel: string
  title: string
  subtitle: string
  category: string
  badge: string
  description: string
  highlights: string[]
  coreTechnologies: string[]
  productionPractices: string[]
}

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  category: string
  status: string
  description: string
  techs: string[]
  highlights: string[]
  repoUrl?: string
  stars?: number
  forks?: number
  contributors?: number
}

export interface OracleLotItem {
  id: number
  tier: string
  motto: string
  source: string
  principle: string
  dos: string
  donts: string
  direction: string
}

export interface CareerStepItem {
  num: string
  title: string
  desc: string
}

export interface CareerDiffItem {
  traditional: string
  gewu: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface TranslationsSchema {
  nav: {
    title: string
    tagline: string
    sealText: string
    sealSubtext: string
    links: NavItem[]
    github: string
    maintainer: string
    join: string
    apply: string
    githubOrg: string
  }
  hero: {
    badge: string
    sealText: string
    titleLine1: string
    titleLine2: string
    descriptionQuote: string
    descriptionBody: string
    exploreBtn: string
    maintainerBtn: string
    prBtn: string
    metrics: MetricItem[]
  }
  philosophy: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    originStory: string
    pillars: PillarItem[]
    bannerSealText: string
    bannerSealSubtext: string
    bannerTitle: string
    bannerDesc: string
    bannerTag1: string
    bannerTag2: string
  }
  techDirections: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    desc: string
    practicesTitle: string
    exploreWithMaintainer: string
    coreCombatTitle: string
    techMatrixTitle: string
    directions: TechDirectionItem[]
  }
  oracle: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    desc: string
    cardTitle: string
    todayMottoTag: string
    redrawBtn: string
    redrawingBtn: string
    sourcePrefix: string
    disciplinePrefix: string
    dosLabel: string
    dontsLabel: string
    saveBtn: string
    savedBtn: string
    footerQuote: string
    footerSealText: string
    footerSealSubtext: string
    lots: OracleLotItem[]
  }
  projects: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    desc: string
    browseGithub: string
    contributorsSuffix: string
    claimIssue: string
    codeRepo?: string
    viewCode?: string
    projects: ProjectItem[]
  }
  career: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    desc: string
    loopTag: string
    steps: CareerStepItem[]
    diffTitle: string
    diffDesc: string
    badTag: string
    goodTag: string
    differences: CareerDiffItem[]
    companionNote: string
    mentorCta: string
  }
  collaboration: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    desc: string
    githubCard: {
      tag: string
      title: string
      desc: string
      point1: string
      point2: string
      btn: string
    }
    maintainerCard: {
      sealText: string
      sealSubtext: string
      title: string
      desc: string
      wechatLabel: string
      copyBtn: string
      copiedBtn: string
      viewQrBtn: string
    }
    weeklySync: {
      title: string
      desc: string
      tag: string
    }
  }
  faq: {
    sealText: string
    sealSubtext: string
    subtitle: string
    title: string
    desc: string
    items: FAQItem[]
  }
  footer: {
    motto: string
    desc: string
    sealText: string
    sealSubtext: string
    colTechTitle: string
    colCommunityTitle: string
    linkGithub: string
    linkProjects: string
    linkOracle: string
    linkFaq: string
    copyright: string
    builtWith: string
    backToTop: string
  }
  maintainerModal: {
    title: string
    sealText: string
    sealSubtext: string
    tagline: string
    tipPrefix: string
    tipHighlight: string
    tipSuffix: string
    wechatLabel: string
    emailLabel: string
    copyBtn: string
    copiedBtn: string
    qrTitlePrefix: string
    qrPrompt: string
    saveQrBtn: string
    viewFullBtn: string
    closeBtn: string
  }
  mobileDock: {
    directions: string
    maintainer: string
  }
  armillary: {
    sealText: string
    sealSubtext: string
    title: string
    subtitle: string
    celestialMode: string
    celestialTip: string
    crystalMode: string
    crystalTip: string
    constellationMode: string
    constellationTip: string
    resetTip: string
    guideInteraction: string
    quote: string
  }
  theme: {
    title: string
    white: string
    cream: string
    dark: string
    whiteHint: string
    creamHint: string
    darkHint: string
  }
  lang: {
    name: string
    zh: string
    en: string
    switchTip: string
  }
}
