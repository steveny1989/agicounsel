import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGI Counsel Network｜智能拓展可能，判断塑造未来',
  description:
    '连接人工智能生态（应用、模型、基础设施、芯片、能源）法律专业人士的独立同行网络。深度探讨 AI 原生法务部门、多智能体治理与人类判断。',
  keywords: [
    'AGI Counsel Network',
    'AGI Counsel',
    'AI 原生法务部门',
    '多智能体法务编排',
    'Multi-Agent 法律治理',
    '企业法务 AI 转型',
    'Chief of Staff 法务参谋长',
    '自学习知识飞轮',
  ],
  alternates: {
    canonical: '/zh/',
    languages: { en: '/', 'zh-CN': '/zh/', 'x-default': '/' },
  },
  openGraph: {
    title: 'AGI Counsel Network｜智能拓展可能，判断塑造未来',
    description: '智能拓展可能。判断塑造未来。连接 AI 生态法律专业人士的同行网络。',
    url: 'https://agicounsel.org/zh/',
    siteName: 'AGI Counsel Network',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'AGI Counsel Network｜智能拓展可能，判断塑造未来' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGI Counsel Network｜智能拓展可能，判断塑造未来',
    description: '智能拓展可能。判断塑造未来。连接 AI 生态法律专业人士的同行网络。',
    images: ['/og.png'],
  },
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
