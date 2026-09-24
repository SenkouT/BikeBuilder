import './globals.css';
import type { Metadata } from 'next';
import { SiteChrome } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'BikeBuilder',
  description: 'Construis ton vélo, vérifie la compatibilité et compare les meilleurs prix.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <SiteChrome />
      </body>
    </html>
  );
}
