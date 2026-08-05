import { NextRequest, NextResponse } from 'next/server';
import { queryTransitDatabase } from '@/core/infrastructure/database/transitDb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || searchParams.get('query') || '';

  try {
    const trains = queryTransitDatabase(q);
    return NextResponse.json({
      success: true,
      count: trains.length,
      data: trains.map((t) => ({
        number: t.number,
        name: t.name,
        origin: { code: t.fromCode, name: t.from },
        destination: { code: t.toCode, name: t.to },
        category: t.category,
        avgSpeedKmh: t.avgSpeedKmh,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
