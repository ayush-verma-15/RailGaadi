import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      { id: '1', trainNumber: '22436', name: 'Varanasi Vande Bharat Express', origin: 'NDLS', destination: 'BSB' },
      { id: '2', trainNumber: '12951', name: 'New Delhi Tejas Rajdhani Express', origin: 'MMCT', destination: 'NDLS' },
    ],
  });
}
