import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGI Counsel Network | Legal judgment for the age of intelligence',
  description: 'A trusted peer community for legal professionals across the AI ecosystem.',
  metadataBase: new URL('https://agicounsel.org'),
  openGraph: { title: 'AGI Counsel Network', description: 'Legal judgment for the age of intelligence.', url: 'https://agicounsel.org', siteName: 'AGI Counsel Network', type: 'website', images: [{ url: '/agicounsel-social-preview.png', width: 1747, height: 909, alt: 'AGI Counsel Network — Legal judgment for the age of intelligence.' }] },
  twitter: { card: 'summary_large_image', title: 'AGI Counsel Network', description: 'Legal judgment for the age of intelligence.', images: ['/agicounsel-social-preview.png'] },
  alternates: { canonical: '/', languages: { en: '/', 'zh-CN': '/zh/' } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
