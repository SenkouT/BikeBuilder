'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { categories, products } from '@/lib/data/demo';
import { checkCompatibility } from '@/lib/compatibility/engine';
import { bestOffer, DemoPriceProvider } from '@/lib/pricing/providers';
import type { Category, Component } from '@/types/components';

const categoryOrder: Category[] = ['cadre', 'fourche', 'roues', 'pneus', 'transmission', 'freinage', 'cockpit', 'selle', 'pedales', 'accessoires'];

const provider = new DemoPriceProvider();

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, Component>>({});

  const currentCategory = categoryOrder[step];
  const currentOptions = products.filter((p) => p.category === currentCategory);

  const total = useMemo(
    () =>
      Object.values(selected).reduce((sum, item) => {
        if (!item.price) return sum;
        return sum + item.price;
      }, 0),
    [selected],
  );

  const compatibility = useMemo(() => checkCompatibility(selected), [selected]);
  const compatibleCount = compatibility.filter((r) => r.status === 'compatible').length;
  const warningCount = compatibility.filter((r) => r.status === 'warning').length;
  const errorCount = compatibility.filter((r) => r.status === 'incompatible').length;

  const setCategorySelection = async (component: Component) => {
    setSelected((prev) => ({ ...prev, [currentCategory]: component }));
    const offers = await provider.searchProduct(component);
    if (offers.length) {
      const chosen = bestOffer(offers);
      if (chosen) {
        console.info(`${component.name} offers: ${chosen.seller} at ${chosen.price + chosen.shipping}€`);
      }
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, categoryOrder.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <main className="container py-10">
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.18em] text-pine">Configurateur</div>
          <Link href="/" className="text-3xl font-black tracking-tight">
            Bike<span className="text-pine">Builder</span>
          </Link>
        </div>
        <Link href="/compare" className="rounded-full bg-ink px-5 py-3 font-bold text-white">
          Voir le comparateur
        </Link>
      </header>

      <div className="mb-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="card p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.13em] text-pine">Étape {step + 1}</div>
              <h1 className="text-3xl font-black">{categories.find((c) => c.id === currentCategory)?.label ?? 'Composant'}</h1>
            </div>
            <div className="rounded-full bg-mint px-3 py-1 text-sm font-bold text-pine">
              {currentOptions.length} composants
            </div>
          </div>

          <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-pine transition-all"
              style={{ width: `${((step + 1) / categoryOrder.length) * 100}%` }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {currentOptions.map((option) => {
              const selectedThis = selected[currentCategory]?.id === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setCategorySelection(option)}
                  className={`rounded-3xl border p-4 text-left transition ${
                    selectedThis ? 'border-pine bg-mint shadow-lg shadow-pine/10' : 'border-black/10 bg-white hover:border-pine/40'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-black/60">
                      {option.brand}
                    </span>
                    {option.price && <span className="font-black text-pine">{option.price} €</span>}
                  </div>
                  <div className="text-lg font-black">{option.name}</div>
                  <div className="mt-3 space-y-1 text-sm text-black/60">
                    {Object.entries(option.specs)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key}>
                          {key}: {String(value)}
                        </div>
                      ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 0}
              className="rounded-full border border-black/15 bg-white px-4 py-2 font-bold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-pine px-5 py-3 font-bold text-white"
            >
              {step === categoryOrder.length - 1 ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </section>

        <aside className="card p-6">
          <div className="mb-6 text-sm font-black uppercase tracking-[0.16em] text-pine">Mon vélo</div>

          <div className="space-y-4">
            {categoryOrder.map((category) => {
              const item = selected[category];
              return (
                <div key={category} className="flex items-center justify-between gap-3 border-b border-black/5 pb-3 text-sm">
                  <span className="capitalize text-black/70">{categories.find((c) => c.id === category)?.label}</span>
                  <span className="font-bold text-ink">{item ? item.name : '—'}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-black/10 pt-5">
            <div className="flex items-center justify-between text-lg font-black">
              <span>Total</span>
              <span>{total.toLocaleString('fr-FR')} €</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-pine">
              <span className="text-xl">✓</span>
              {compatibleCount} composants compatibles
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <span className="text-xl">⚠</span>
              {warningCount} avertissement
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <span className="text-xl">✕</span>
              {errorCount} incompatibilité
            </div>
          </div>
        </aside>
      </div>

      <section className="card p-6">
        <h2 className="mb-4 text-2xl font-black">Compatibilité</h2>
        {compatibility.length ? (
          <div className="space-y-4">
            {compatibility.map((item, index) => (
              <div
                key={`${item.status}-${index}`}
                className={`rounded-2xl border p-4 ${
                  item.status === 'compatible'
                    ? 'border-green-200 bg-green-50 text-green-900'
                    : item.status === 'warning'
                      ? 'border-amber-200 bg-amber-50 text-amber-900'
                      : 'border-red-200 bg-red-50 text-red-900'
                }`}
              >
                <div className="flex items-center gap-3 text-lg font-black">
                  <span>{item.status === 'compatible' ? '✓' : item.status === 'warning' ? '⚠' : '✕'}</span>
                  {item.status === 'compatible' ? 'Compatible' : item.status === 'warning' ? 'Compatibilité à vérifier' : 'Incompatible'}
                </div>
                <p className="mt-2 leading-7">{item.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-black/60">Aucune règle de compatibilité déclenchée.</div>
        )}
      </section>
    </main>
  );
}
