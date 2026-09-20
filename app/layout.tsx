import type { Metadata } from 'next';
import './globals.css';
import LanguageRouter from './components/LanguageRouter';

export const metadata: Metadata = {
  title: {
    default: 'AGI Counsel Network | Intelligence expands possibility',
    template: '%s | AGI Counsel Network',
  },
  description:
    'An independent peer community for legal professionals across the AI ecosystem: Applications, Models, Infrastructure, Chips, and Energy.',
  keywords: [
    'AGI Counsel',
    'AGI Counsel Network',
    'AI-Native Legal Department',
    'AI Legal Governance',
    'Multi-Agent Legal Workflows',
    'Lawyer as Chief of Staff',
    'Human-in-the-Loop Legal Governance',
    'Frontier Model Law',
    'General Counsel AI Network',
  ],
  authors: [{ name: 'AGI Counsel Network', url: 'https://agicounsel.org' }],
  creator: 'AGI Counsel Network',
  publisher: 'AGI Counsel Network',
  category: 'technology',
  metadataBase: new URL('https://agicounsel.org'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AGI Counsel Network',
    description:
      'Intelligence expands possibility. Judgment shapes what comes next. A peer network for legal professionals across the AI ecosystem.',
    url: 'https://agicounsel.org',
    siteName: 'AGI Counsel Network',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1730,
        height: 909,
        alt: 'AGI Counsel Network — Intelligence expands possibility. Judgment shapes what comes next.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGI Counsel Network',
    description:
      'Intelligence expands possibility. Judgment shapes what comes next. A peer network for legal professionals across the AI ecosystem.',
    images: ['/og.png'],
  },
  alternates: { canonical: '/', languages: { en: '/', 'zh-CN': '/zh/', 'x-default': '/' } },
};

const rootJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://agicounsel.org/#organization',
      name: 'AGI Counsel Network',
      alternateName: ['AGI Counsel', 'AGI Counsel 法律人网络', 'AI 原生法务同行网络'],
      url: 'https://agicounsel.org',
      email: 'hello@agicounsel.org',
      description:
        'Independent peer community for legal professionals across the AI ecosystem: Applications, Models, Infrastructure, Chips, and Energy.',
      knowsAbout: [
        'AI-Native Legal Department Architecture',
        'Multi-Agent Legal Orchestration',
        'Human-in-the-Loop Governance',
        'Compounding Institutional Memory',
        'Frontier Foundation Model Compliance',
        'AI Compute & Infrastructure Law',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://agicounsel.org/#website',
      url: 'https://agicounsel.org',
      name: 'AGI Counsel Network',
      publisher: { '@id': 'https://agicounsel.org/#organization' },
      inLanguage: ['en', 'zh-CN'],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="AGI Counsel Network Notes (RSS)" href="/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="AGI Counsel Network 社群笔记 (RSS)" href="/zh/feed.xml" />
        <link rel="help" type="text/plain" title="LLM Technical Index" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body>
        <LanguageRouter />
        {children}
      </body>
    </html>
  );
}
