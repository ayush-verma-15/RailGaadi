import { NextRequest, NextResponse } from 'next/server';
import { searchTransitVehicles } from '@/core/infrastructure/adapters/railRadarAdapter';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  try {
    const results = await searchTransitVehicles(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Search failed' }, { status: 500 });
  }
}
