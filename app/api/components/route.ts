import { NextResponse } from 'next/server';
import { products } from '@/lib/data/demo';
import { DemoPriceProvider } from '@/lib/pricing/providers';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get('q') ?? '').toLowerCase();
  const list = products.filter(
    (item) =>
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query),
  );

  const provider = new DemoPriceProvider();
  const enriched = await Promise.all(
    list.map(async (product) => ({
      ...product,
      offers: await provider.searchProduct(product),
    })),
  );

  return NextResponse.json({ demo: true, products: enriched });
}
