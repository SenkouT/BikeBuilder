'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { categories, products } from '@/lib/data/demo';
import { checkCompatibility } from '@/lib/compatibility/engine';
import type { Category, Component } from '@/types/components';

const categoryOrder: Category[] = ['cadre', 'fourche', 'roues', 'pneus', 'transmission', 'freinage', 'cockpit', 'selle', 'pedales', 'accessoires'];
const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('Toutes');
  const [selected, setSelected] = useState<Partial<Record<Category, Component>>>({});
  const [savedMessage, setSavedMessage] = useState('');
  const currentCategory = categoryOrder[step];
  const currentOptions = products.filter((product) => {
    const matchesCategory = product.category === currentCategory;
    const matchesQuery = `${product.name} ${product.brand}`.toLowerCase().includes(query.toLowerCase());
    const matchesBrand = brand === 'Toutes' || product.brand === brand;
    return matchesCategory && matchesQuery && matchesBrand;
  });
  const brands = ['Toutes', ...new Set(products.filter((p) => p.category === currentCategory).map((p) => p.brand))];
  const compatibility = useMemo(() => checkCompatibility(selected), [selected]);
  const total = Object.values(selected).reduce((sum, item) => sum + (item?.price ?? 0), 0);
  const errors = compatibility.filter((item) => item.status === 'incompatible').length;
  const warnings = compatibility.filter((item) => item.status === 'warning').length;

  function selectComponent(component: Component) {
    setSelected((current) => ({ ...current, [currentCategory]: component }));
  }

  function saveConfiguration() {
    localStorage.setItem('bikebuilder-configuration', JSON.stringify(selected));
    setSavedMessage('Configuration enregistrée sur cet appareil.');
    window.setTimeout(() => setSavedMessage(''), 3000);
  }

  return (
    <main className="container py-8">
      <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div><Link href="/" className="text-3xl font-black">Bike<span className="text-pine">Builder</span></Link><p className="mt-1 text-sm text-black/55">Configurateur intelligent</p></div>
        <div className="flex gap-3"><Link href="/saved" className="rounded-full border border-black/15 bg-white px-4 py-2 font-bold">Mes vélos</Link><Link href="/compare" className="rounded-full bg-ink px-4 py-2 font-bold text-white">Comparer les offres</Link></div>
      </header>

      <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto pb-1">
        {categories.map((category, index) => <button key={category.id} type="button" onClick={() => setStep(index)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${index === step ? 'bg-pine text-white' : 'bg-white text-black/60 hover:text-pine'}`}>{index + 1}. {category.label}</button>)}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="card p-5 md:p-7">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-pine">Étape {step + 1} sur {categoryOrder.length}</p><h1 className="mt-1 text-3xl font-black">{categories[step].label}</h1></div><div className="text-sm font-bold text-black/50">{currentOptions.length} résultat(s)</div></div>
          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-pine transition-all" style={{ width: `${((step + 1) / categoryOrder.length) * 100}%` }} /></div>
          <div className="mb-6 grid gap-3 md:grid-cols-[1fr_180px]"><label className="relative"><span className="sr-only">Rechercher</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un composant ou une marque…" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 outline-none focus:border-pine" /></label><select value={brand} onChange={(event) => setBrand(event.target.value)} className="rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 outline-none focus:border-pine">{brands.map((item) => <option key={item}>{item}</option>)}</select></div>
          {currentOptions.length === 0 ? <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center text-black/55">Aucun composant ne correspond à ta recherche.</div> : <div className="grid gap-4 md:grid-cols-2">{currentOptions.map((option) => { const active = selected[currentCategory]?.id === option.id; return <button key={option.id} type="button" onClick={() => selectComponent(option)} className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 ${active ? 'border-pine bg-mint shadow-lg shadow-pine/10' : 'border-black/10 bg-white hover:border-pine/40'}`}><div className="flex items-start justify-between gap-3"><span className="badge bg-slate-100 text-black/60">{option.brand}</span><span className="font-black text-pine">{option.price === null ? 'Prix indisponible' : euro.format(option.price)}</span></div><h2 className="mt-4 text-lg font-black">{option.name}</h2><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-black/55">{Object.entries(option.specs).slice(0, 4).map(([key, value]) => <span key={key}><b>{key} :</b> {String(value)}</span>)}</div>{active && <div className="mt-4 text-sm font-black text-pine">✓ Sélectionné</div>}</button>; })}</div>}
          <div className="mt-8 flex items-center justify-between gap-3"><button type="button" disabled={step === 0} onClick={() => { setStep((value) => value - 1); setQuery(''); setBrand('Toutes'); }} className="rounded-full border border-black/15 px-5 py-3 font-bold disabled:opacity-35">← Précédent</button><button type="button" onClick={() => { setStep((value) => Math.min(value + 1, categoryOrder.length - 1)); setQuery(''); setBrand('Toutes'); }} className="rounded-full bg-pine px-5 py-3 font-bold text-white">{step === categoryOrder.length - 1 ? 'Configuration terminée' : 'Étape suivante →'}</button></div>
        </section>

        <aside className="card h-fit p-6 lg:sticky lg:top-5"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-pine">Résumé permanent</p><h2 className="mt-1 text-2xl font-black">Mon vélo</h2></div><span className="text-3xl">🚲</span></div><div className="mt-6 space-y-3">{categoryOrder.map((category) => { const item = selected[category]; return <div key={category} className="flex items-center justify-between gap-3 border-b border-black/5 pb-3 text-sm"><span className="text-black/60">{categories.find((c) => c.id === category)?.label}</span><span className="max-w-[170px] truncate text-right font-bold">{item ? euro.format(item.price ?? 0) : '—'}</span></div>; })}</div><div className="mt-6 border-t border-black/10 pt-5"><div className="flex justify-between text-lg font-black"><span>Total</span><span>{euro.format(total)}</span></div><p className="mt-1 text-xs text-black/45">Prix de démonstration uniquement</p></div><div className="mt-6 space-y-2 text-sm"><div className="text-pine">✓ {Object.keys(selected).length} composant(s) sélectionné(s)</div><div className="text-amber-600">⚠ {warnings} avertissement(s)</div><div className="text-red-600">✕ {errors} incompatibilité(s)</div></div><button type="button" onClick={saveConfiguration} className="mt-6 w-full rounded-full bg-ink px-4 py-3 font-bold text-white">Sauvegarder ma configuration</button>{savedMessage && <p className="mt-3 rounded-xl bg-mint p-3 text-center text-sm font-bold text-pine">{savedMessage}</p>}</aside>
      </div>

      <section className="card mt-6 p-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Contrôle de compatibilité</h2><span className={errors ? 'badge bg-red-100 text-red-700' : 'badge bg-mint text-pine'}>{errors ? 'Action requise' : 'Configuration saine'}</span></div><div className="space-y-3">{compatibility.map((item, index) => <div key={`${item.status}-${index}`} className={`rounded-2xl border p-4 ${item.status === 'compatible' ? 'border-green-200 bg-green-50 text-green-900' : item.status === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-red-200 bg-red-50 text-red-900'}`}><p className="font-black">{item.status === 'compatible' ? '✓ Compatible' : item.status === 'warning' ? '⚠ Compatibilité à vérifier' : '✕ Incompatible'}</p><p className="mt-1 text-sm leading-6">{item.message}</p></div>)}</div></section>
    </main>
  );
}
