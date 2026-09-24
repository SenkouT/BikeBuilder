import Link from 'next/link';

const steps = [
  'Cadre',
  'Fourche',
  'Roues',
  'Pneus',
  'Transmission',
  'Freinage',
  'Cockpit',
  'Selle',
  'Pédales',
  'Accessoires',
];

export default function HomePage() {
  return (
    <main>
      <header className="container flex items-center justify-between py-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-ink">
          Bike<span className="text-pine">Builder</span>
          <span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-pine" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-black/70 md:flex">
          <Link href="/builder">Construire mon vélo</Link>
          <Link href="/saved">Mes configurations</Link>
          <Link href="/compare">Comparateur</Link>
          <Link href="/builder">Composants</Link>
          <Link href="#about">À propos</Link>
        </nav>

        <Link
          href="/builder"
          className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-pine"
        >
          Commencer ma configuration
        </Link>
      </header>

      <section className="hero-grid border-y border-black/5">
        <div className="container grid min-h-[620px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pine">
              <span className="h-2 w-2 rounded-full bg-pine" />
              Configurateur intelligent
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.06em] md:text-7xl">
              Construis ton vélo.
              <br />
              <span className="text-pine">Vérifie chaque</span>
              <br />
              composant.
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-black/60">
              Sélectionne tes composants, vérifie automatiquement leur compatibilité et trouve les meilleures offres disponibles.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="rounded-full bg-pine px-7 py-4 font-bold text-white shadow-lg shadow-pine/20 transition hover:-translate-y-1"
              >
                Construire mon vélo →
              </Link>
              <Link
                href="#about"
                className="rounded-full border border-black/15 bg-white px-7 py-4 font-bold transition hover:bg-white/80"
              >
                Découvrir
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm">
              <div>
                <span className="text-2xl font-black">10</span>
                <br />
                <span className="text-black/50">catégories</span>
              </div>
              <div>
                <span className="text-2xl font-black">100%</span>
                <br />
                <span className="text-black/50">compatibilité</span>
              </div>
              <div>
                <span className="text-2xl font-black">0€</span>
                <br />
                <span className="text-black/50">pour commencer</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 right-5 rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-pine">
                <span>✓</span>
                Compatible
              </div>
              <p className="mt-1 text-xs text-black/55">Tous les composants validés</p>
            </div>

            <div className="flex aspect-square items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-pine to-[#0d382b] text-[9rem] shadow-2xl shadow-pine/20">
              🚲
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-ink p-5 text-white shadow-xl">
              <p className="text-xs uppercase tracking-[0.12em] text-white/60">Prix total estimé</p>
              <div className="mt-2 text-3xl font-black">2 847 €</div>
              <p className="mt-1 text-xs text-[#9ee4be]">↓ jusqu’à 12% économisé</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container py-24">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-pine">Simple et précis</p>
          <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">Ton projet, étape par étape.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Choisis tes composants', 'Cadre, roues, transmission… configure chaque détail selon ta pratique.'],
            ['02', 'Valide la compatibilité', 'Notre moteur détecte les incompatibilités et explique clairement pourquoi.'],
            ['03', 'Achète au meilleur prix', 'Compare les offres disponibles et optimise ton panier en un clic.'],
          ].map(([step, title, text]) => (
            <div key={step} className="card p-7">
              <span className="text-sm font-black text-pine">{step}</span>
              <h3 className="mt-12 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-black/55">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="card p-8">
          <div className="mb-7 flex items-center justify-between gap-3">
            <h3 className="text-2xl font-black">Architecture du projet</h3>
            <span className="badge bg-mint text-pine">Next.js + TypeScript</span>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-black/10 bg-slate-50 p-4 text-sm font-semibold">
                <span className="text-pine">{index + 1}</span>
                <div className="mt-2">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-ink py-10 text-white">
        <div className="container flex flex-col justify-between gap-4 md:flex-row">
          <div className="text-xl font-black">
            Bike<span className="text-[#9ee4be]">Builder</span>
          </div>
          <p className="text-sm text-white/50">Mode démonstration · Les prix affichés sont des données de test.</p>
        </div>
      </footer>
    </main>
  );
}
