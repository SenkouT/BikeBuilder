import Link from 'next/link';

const saved = [
  { id: 'bike-01', name: 'VTT Trail Ready', total: '3 240 €', status: 'Compatible' },
  { id: 'bike-02', name: 'Road Performance', total: '2 840 €', status: 'A vérifier' },
];

export default function SavedPage() {
  return (
    <main className="container py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.18em] text-pine">Mes configurations</div>
          <h1 className="text-4xl font-black tracking-[-0.04em]">Mes vélos sauvegardés</h1>
        </div>
        <Link href="/builder" className="rounded-full bg-ink px-5 py-3 font-bold text-white">
          Nouveau vélo
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {saved.map((bike) => (
          <div key={bike.id} className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">{bike.name}</h2>
                <p className="mt-2 text-sm text-black/60">Configuration sauvegardée</p>
              </div>
              <span className="badge bg-mint text-pine">{bike.status}</span>
            </div>
            <div className="mt-7 text-3xl font-black text-pine">{bike.total}</div>
            <div className="mt-8 flex gap-3">
              <button type="button" className="rounded-full border border-black/15 bg-white px-4 py-2 font-bold">
                Ouvrir
              </button>
              <button type="button" className="rounded-full bg-pine px-4 py-2 font-bold text-white">
                Partager
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
