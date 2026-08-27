import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGI Counsel Network｜智能时代的法律判断力',
  description: '连接人工智能生态各环节法律专业人士的可信同行网络。',
  alternates: {
    canonical: '/zh/',
    languages: { en: '/', 'zh-CN': '/zh/' },
  },
  openGraph: {
    title: 'AGI Counsel Network｜智能时代的法律判断力',
    description: '连接人工智能生态各环节法律专业人士的可信同行网络。',
    url: 'https://agicounsel.org/zh/',
    siteName: 'AGI Counsel Network',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
