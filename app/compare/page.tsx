import Link from 'next/link';
import { products } from '@/lib/data/demo';
import { bestOffer } from '@/lib/pricing/providers';

const productRows = products.slice(0, 6).map((product) => ({
  ...product,
  offer: bestOffer([
    { seller: 'Boutique A', price: product.price ?? 0, shipping: 5, available: true, delivery: '2–4 jours', url: '#' },
    { seller: 'Boutique B', price: (product.price ?? 0) - 12, shipping: 0, available: true, delivery: '3–5 jours', url: '#' },
    { seller: 'Boutique C', price: (product.price ?? 0) + 14, shipping: 4, available: true, delivery: '1–2 jours', url: '#' },
  ]),
}));

export default function ComparePage() {
  return (
    <main className="container py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.18em] text-pine">Comparateur</div>
          <h1 className="text-4xl font-black tracking-[-0.04em]">Prix et offres</h1>
        </div>
        <Link href="/builder" className="rounded-full bg-pine px-5 py-3 font-bold text-white">
          Retour au configurateur
        </Link>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-black/70">
            <tr>
              <th className="px-6 py-4">Composant</th>
              <th className="px-6 py-4">Vendeur</th>
              <th className="px-6 py-4">Prix</th>
              <th className="px-6 py-4">Livraison</th>
              <th className="px-6 py-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {productRows.map((row) => (
              <tr key={row.id} className="border-t border-black/5">
                <td className="px-6 py-4 font-bold">{row.name}</td>
                <td className="px-6 py-4">{row.offer?.seller ?? 'Prix indisponible'}</td>
                <td className="px-6 py-4">{row.offer ? `${row.offer.price} €` : 'Prix indisponible'}</td>
                <td className="px-6 py-4">{row.offer ? `${row.offer.shipping} €` : '—'}</td>
                <td className="px-6 py-4 font-black text-pine">
                  {row.offer ? `${row.offer.price + row.offer.shipping} €` : 'Prix indisponible'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
