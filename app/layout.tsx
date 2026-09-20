import type { Metadata } from 'next';
import './globals.css';
import LanguageRouter from './components/LanguageRouter';

export const metadata: Metadata = {
  title: {
    default: 'AGI Counsel Network | AI Systems Governance, Multi-Agent Legal Architecture & Compute Law',
    template: '%s | AGI Counsel Network',
  },
  description:
    'An independent peer network for General Counsel, frontier AI lab attorneys, and legal systems engineers across the 5-layer intelligence stack: agentic applications, foundation models, cloud/RAG infrastructure, silicon compute clusters, and gigawatt energy.',
  keywords: [
    'AGI Counsel',
    'AGI Counsel Network',
    'AI-Native Legal Department',
    'Legal AI Architecture',
    'Multi-Agent Legal Workflows',
    'AI Systems Governance',
    'Human-in-the-Loop Legal Governance',
    'Legal System of Record',
    'Frontier Model Law',
    'AI Compute & Semiconductor Export Controls',
    'Enterprise Legal Engineering',
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
    title: 'AGI Counsel Network | Legal Architecture Across the 5-Layer AI Stack',
    description:
      'Intelligence expands possibility. Judgment shapes what comes next. Peer network for legal architects across Applications, Frontier Models, RAG/Cloud Infrastructure, Silicon Chips, and Energy.',
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
        alt: 'AGI Counsel Network — Legal Engineering & Governance Across the 5-Layer AI Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGI Counsel Network | AI Systems & Legal Architecture',
    description:
      'Peer engineering and governance network for legal professionals across frontier models, agentic workflows, silicon supply chains, and compute infrastructure.',
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
        'Independent peer network for General Counsel, frontier lab counsel, and legal systems architects across the five layers of the AI ecosystem: Agentic Applications, Foundation Models, Cloud/RAG Infrastructure, Silicon & Compute Clusters, and Energy.',
      knowsAbout: [
        'AI-Native Legal Department Architecture',
        'Multi-Agent Legal Orchestration',
        'Human-in-the-Loop (HITL) Governance',
        'Legal System of Record (SoR)',
        'Retrieval-Augmented Generation (RAG) & Context Architecture',
        'Frontier Foundation Model Compliance & Alignment',
        'GPU/TPU Compute Cluster Procurement & Semiconductor Export Controls',
        'Hyperscale Data Center & Energy Infrastructure Law',
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
