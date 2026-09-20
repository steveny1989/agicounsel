import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGI Counsel Network｜AI 原生法务架构、多智能体治理与全栈算力合规网络',
  description:
    '连接人工智能五层技术栈（Agentic 应用、前沿大模型、RAG 与云底座、AI 芯片集群、吉瓦级能源）总法律顾问与法务系统工程专家的独立同行网络。深度剖析 Legal AI 五层价值架构与人机协同治理。',
  keywords: [
    'AGI Counsel Network',
    'AGI Counsel',
    'AI 原生法务部门',
    'Legal AI 五层架构',
    '多智能体法务编排',
    'Multi-Agent 法律治理',
    '企业法务 AI 转型',
    '大模型合规与对齐',
    '算力集群与半导体合规',
    'Human-in-the-Loop 法务系统',
  ],
  alternates: {
    canonical: '/zh/',
    languages: { en: '/', 'zh-CN': '/zh/', 'x-default': '/' },
  },
  openGraph: {
    title: 'AGI Counsel Network｜AI 原生法务架构与全栈法律工程同行网络',
    description:
      '智能拓展可能，判断塑造未来。纵贯 Agentic 应用、基础大模型、云与知识图谱基础设施、先进算力芯片与能源底座的法律架构师网络。',
    url: 'https://agicounsel.org/zh/',
    siteName: 'AGI Counsel Network',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'AGI Counsel Network｜AI 原生法务架构与全栈法律工程同行网络' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGI Counsel Network｜AI 原生法务架构与多智能体治理',
    description: '连接人工智能五层生态（应用、模型、基础设施、芯片、能源）法律架构师的独立同行社群。',
    images: ['/og.png'],
  },
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
