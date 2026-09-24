import type { Component, Offer } from '@/types/components';

export interface PriceProvider {
  searchProduct(product: Component): Promise<Offer[]>;
}

export class DemoPriceProvider implements PriceProvider {
  async searchProduct(product: Component): Promise<Offer[]> {
    const base = product.price ?? 0;
    const rows: Offer[] = [
      { seller: 'Boutique A', price: base, shipping: 5, available: true, delivery: '2–4 jours', url: '#' },
      { seller: 'Boutique B', price: Math.max(0, base - 12), shipping: 0, available: true, delivery: '3–5 jours', url: '#' },
      { seller: 'Boutique C', price: base + 14, shipping: 4, available: true, delivery: '1–2 jours', url: '#' },
    ];

    return rows;
  }
}

export function bestOffer(offers: Offer[]) {
  return offers.filter((offer) => offer.available).sort((a, b) => a.price + a.shipping - (b.price + b.shipping))[0] ?? null;
}
