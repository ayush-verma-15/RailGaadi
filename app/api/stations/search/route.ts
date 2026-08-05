import { NextRequest, NextResponse } from 'next/server';

const POPULAR_STATIONS = [
  { code: 'NDLS', name: 'New Delhi', lat: 28.643, lng: 77.2194, state: 'Delhi', zone: 'NR' },
  { code: 'MMCT', name: 'Mumbai Central', lat: 18.9696, lng: 72.8193, state: 'Maharashtra', zone: 'WR' },
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', lat: 18.9401, lng: 72.8347, state: 'Maharashtra', zone: 'CR' },
  { code: 'HWH', name: 'Howrah Junction', lat: 22.5837, lng: 88.3426, state: 'West Bengal', zone: 'ER' },
  { code: 'MAS', name: 'Chennai Central', lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu', zone: 'SR' },
  { code: 'BSB', name: 'Varanasi Junction', lat: 25.3268, lng: 82.9876, state: 'Uttar Pradesh', zone: 'NR' },
  { code: 'SBC', name: 'KSR Bengaluru City', lat: 12.978, lng: 77.5694, state: 'Karnataka', zone: 'SWR' },
  { code: 'PNBE', name: 'Patna Junction', lat: 25.602, lng: 85.1376, state: 'Bihar', zone: 'ECR' },
  { code: 'LKO', name: 'Lucknow Charbagh', lat: 26.8315, lng: 80.9231, state: 'Uttar Pradesh', zone: 'NR' },
  { code: 'KOTA', name: 'Kota Junction', lat: 25.2138, lng: 75.8648, state: 'Rajasthan', zone: 'WCR' },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || searchParams.get('query') || '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ success: true, count: POPULAR_STATIONS.length, data: POPULAR_STATIONS });
  }

  const matches = POPULAR_STATIONS.filter(
    (s) => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q)
  );

  return NextResponse.json({ success: true, count: matches.length, data: matches });
}
