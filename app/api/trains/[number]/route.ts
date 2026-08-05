import { NextRequest, NextResponse } from 'next/server';
import { TRANSIT_DATABASE } from '@/core/infrastructure/database/transitDb';

export async function GET(req: NextRequest, { params }: { params: { number: string } }) {
  const trainNumber = params.number;
  const train = TRANSIT_DATABASE.find((t) => t.number === trainNumber);

  if (!train) {
    return NextResponse.json({ success: false, error: 'Train not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      number: train.number,
      name: train.name,
      origin: { code: train.fromCode, name: train.from },
      destination: { code: train.toCode, name: train.to },
      category: train.category,
      avgSpeedKmh: train.avgSpeedKmh,
    },
  });
}
