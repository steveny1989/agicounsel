import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGI Counsel Network | Intelligence expands possibility',
  description: 'A peer network for legal professionals across the AI ecosystem.',
  metadataBase: new URL('https://agicounsel.org'),
  openGraph: { title: 'AGI Counsel Network', description: 'Intelligence expands possibility. Judgment shapes what comes next.', url: 'https://agicounsel.org', siteName: 'AGI Counsel Network', type: 'website', images: [{ url: '/og.png', width: 1730, height: 909, alt: 'AGI Counsel Network — Intelligence expands possibility. Judgment shapes what comes next.' }] },
  twitter: { card: 'summary_large_image', title: 'AGI Counsel Network', description: 'Intelligence expands possibility. Judgment shapes what comes next.', images: ['/og.png'] },
  alternates: { canonical: '/', languages: { en: '/', 'zh-CN': '/zh/' } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
