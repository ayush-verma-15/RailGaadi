import { NextRequest, NextResponse } from 'next/server';

interface CommunityReportItem {
  id: string;
  trainNumber: string;
  trainName: string;
  user: string;
  type: 'CROWD' | 'CLEANLINESS' | 'FOOD' | 'SECURITY' | 'DELAY' | 'PLATFORM';
  crowdLevel: string;
  comment: string;
  rating: number;
  upvotes: number;
  createdAt: string;
}

let reportsStore: CommunityReportItem[] = [
  {
    id: 'rep-1',
    trainNumber: '22436',
    trainName: 'Varanasi Vande Bharat Express',
    user: 'Amit Sharma',
    type: 'CLEANLINESS',
    crowdLevel: 'Moderate',
    comment: 'Exceptional coach cleanliness and functioning Wi-Fi. Departed right on time from NDLS Platform 16.',
    rating: 5,
    upvotes: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 'rep-2',
    trainNumber: '12951',
    trainName: 'New Delhi Tejas Rajdhani Express',
    user: 'Priya Verma',
    type: 'CROWD',
    crowdLevel: 'Low',
    comment: 'Catering service was hot and fresh. Clean toilets in 3A coach.',
    rating: 5,
    upvotes: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'rep-3',
    trainNumber: '12001',
    trainName: 'Bhopal Shatabdi Express',
    user: 'Rohan Gupta',
    type: 'PLATFORM',
    crowdLevel: 'Heavy',
    comment: 'Platform changed from Platform 1 to Platform 3 at Agra Cantt.',
    rating: 4,
    upvotes: 31,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ success: true, count: reportsStore.length, data: reportsStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newReport: CommunityReportItem = {
      id: `rep-${Date.now()}`,
      trainNumber: body.trainNumber || '22436',
      trainName: body.trainName || 'Express Train',
      user: body.user || 'Verified Passenger',
      type: body.type || 'CROWD',
      crowdLevel: body.crowdLevel || 'Moderate',
      comment: body.comment || 'Smooth trip overall.',
      rating: body.rating || 5,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };

    reportsStore.unshift(newReport);
    return NextResponse.json({ success: true, data: newReport }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
