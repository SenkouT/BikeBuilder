import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  components: z.record(z.string()),
});

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json());
    return NextResponse.json(
      {
        id: 'demo-config-' + Math.random().toString(36).slice(2, 9),
        ...payload,
        savedAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: 'Configuration invalide' }, { status: 400 });
  }
}
