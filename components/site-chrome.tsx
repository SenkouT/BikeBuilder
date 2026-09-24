'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/builder', label: 'Construire mon vélo' },
  { href: '/compare', label: 'Comparateur' },
  { href: '/saved', label: 'Mes configurations' },
];

export function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = helpOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [helpOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Ouvrir l'aide BikeBuilder"
        onClick={() => setHelpOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-pine text-xl text-white shadow-2xl shadow-pine/30 transition hover:scale-105"
      >
        ?
      </button>

      <button
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className="fixed left-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg shadow-soft md:hidden"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button aria-label="Fermer le menu" type="button" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
          <aside className="relative h-full w-[min(88%,360px)] bg-cream p-7 shadow-2xl animate-slide-in">
            <div className="mb-12 flex items-center justify-between">
              <Link href="/" className="text-2xl font-black">Bike<span className="text-pine">Builder</span></Link>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white px-3 py-2 text-lg">×</button>
            </div>
            <nav className="grid gap-3">
              {links.map((link) => <Link key={link.href} href={link.href} className="rounded-2xl bg-white px-5 py-4 text-lg font-black shadow-sm">{link.label}</Link>)}
            </nav>
            <div className="mt-10 rounded-3xl bg-ink p-5 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-[#9ee4be]">Mode démonstration</p>
              <p className="mt-3 text-sm leading-6 text-white/70">Les composants et les prix visibles sont des données de test.</p>
            </div>
          </aside>
        </div>
      )}

      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <button aria-label="Fermer l'aide" type="button" onClick={() => setHelpOpen(false)} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <section role="dialog" aria-modal="true" aria-labelledby="help-title" className="relative w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl animate-modal-in sm:p-9">
            <button type="button" aria-label="Fermer" onClick={() => setHelpOpen(false)} className="absolute right-5 top-5 rounded-full bg-slate-100 px-3 py-1 text-xl">×</button>
            <span className="badge bg-mint text-pine">BIKEBUILDER</span>
            <h2 id="help-title" className="mt-5 text-3xl font-black">Besoin d'un coup de main ?</h2>
            <p className="mt-3 leading-7 text-black/60">Navigue entre les pages ou commence directement ta configuration. Le résumé et les contrôles restent accessibles à chaque étape.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {links.slice(1).map((link) => <Link key={link.href} href={link.href} onClick={() => setHelpOpen(false)} className="rounded-2xl border border-black/10 p-4 font-black transition hover:border-pine hover:bg-mint">{link.label}<span className="float-right text-pine">↗</span></Link>)}
            </div>
            <button type="button" onClick={() => setHelpOpen(false)} className="mt-6 w-full rounded-full bg-ink px-5 py-3 font-bold text-white">Continuer ma visite</button>
          </section>
        </div>
      )}
    </>
  );
}
