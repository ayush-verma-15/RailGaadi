import { NextRequest, NextResponse } from 'next/server';

// In-memory persistent fallback cache for bookmarks API endpoints
let globalBookmarks: Array<{ id: string; trainNumber: string; addedAt: string }> = [
  { id: 'bmark-22436', trainNumber: '22436', addedAt: new Date().toISOString() },
  { id: 'bmark-12951', trainNumber: '12951', addedAt: new Date().toISOString() },
];

export async function GET() {
  return NextResponse.json({ success: true, count: globalBookmarks.length, data: globalBookmarks });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const trainNumber = body.trainNumber || body.number;
    if (!trainNumber) {
      return NextResponse.json({ success: false, error: 'trainNumber required' }, { status: 400 });
    }

    const newBookmark = {
      id: `bmark-${trainNumber}-${Date.now()}`,
      trainNumber,
      addedAt: new Date().toISOString(),
    };

    globalBookmarks.push(newBookmark);
    return NextResponse.json({ success: true, data: newBookmark }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
