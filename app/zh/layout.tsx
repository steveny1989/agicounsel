import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGI Counsel Network｜智能拓展可能，判断塑造未来',
  description: '连接 AI 生态法律专业人士的同行网络。',
  alternates: {
    canonical: '/zh/',
    languages: { en: '/', 'zh-CN': '/zh/' },
  },
  openGraph: {
    title: 'AGI Counsel Network｜智能拓展可能，判断塑造未来',
    description: '智能拓展可能。判断塑造未来。',
    url: 'https://agicounsel.org/zh/',
    siteName: 'AGI Counsel Network',
    locale: 'zh_CN',
    type: 'website',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'AGI Counsel Network｜智能拓展可能，判断塑造未来' }],
  },
  twitter: { card: 'summary_large_image', title: 'AGI Counsel Network｜智能拓展可能，判断塑造未来', description: '智能拓展可能。判断塑造未来。', images: ['/og.png'] },
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
