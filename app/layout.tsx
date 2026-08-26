import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGI Counsel Network | Legal judgment for the age of intelligence',
  description: 'A trusted peer community for legal professionals across the AI ecosystem.',
  metadataBase: new URL('https://agicounsel.org'),
  openGraph: { title: 'AGI Counsel Network', description: 'Legal judgment for the age of intelligence.', url: 'https://agicounsel.org', siteName: 'AGI Counsel Network', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
