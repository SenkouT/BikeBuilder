import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurateur de vélo | BikeBuilder',
  description: 'Sélectionne tes composants, vérifie leur compatibilité et construis ton vélo.',
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
