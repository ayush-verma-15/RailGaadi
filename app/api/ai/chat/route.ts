import { NextRequest, NextResponse } from 'next/server';

/**
 * RailPulse AI - Assistant Chat API Endpoint
 * Handles queries: "Where is 12002?", "Why is it delayed?", "Best train from Delhi to Lucknow?", "Will I miss connection?"
 */
export async function POST(req: NextRequest) {
  try {
    const { message, trainNumber } = await req.json();
    const prompt = (message || '').toLowerCase();

    let reply = '';
    let suggestions: string[] = [];

    if (prompt.includes('where is') || prompt.includes('12002') || prompt.includes('position')) {
      reply =
        'Train #12002 (Bhopal Shatabdi Express) is currently cruising near Agra Cantonment at 128 km/h. It is running 6 minutes behind schedule with an estimated arrival at Rani Kamlapati at 14:05.';
      suggestions = ['Why is it delayed?', 'Will I miss connection?', 'Weather near Agra?'];
    } else if (prompt.includes('why') && (prompt.includes('delay') || prompt.includes('delayed'))) {
      reply =
        'AI Route Diagnosis: The primary delay cause is a 18-minute signal clearance wait at Tundla Junction due to freight congestion, compounded by ongoing track maintenance near Jhansi. Speed recovery of 10-12 minutes is projected before Bhopal.';
      suggestions = ['Alternative trains?', 'Cab options near station', 'Notify me on recovery'];
    } else if (prompt.includes('delhi to lucknow') || prompt.includes('best train')) {
      reply =
        'Top 3 Recommended Trains from New Delhi (NDLS) to Lucknow (LKO):\n1. #22436 Vande Bharat Express (Dep 06:00, 4h 15m duration) - Punctuality 98%\n2. #12004 Lucknow Shatabdi (Dep 06:10, 6h 25m) - Punctuality 94%\n3. #12230 Lucknow Mail (Dep 22:00, overnight) - Punctuality 91%';
      suggestions = ['Track #22436 live', 'Check seat availability', 'CO2 emissions comparison'];
    } else if (prompt.includes('connection') || prompt.includes('miss')) {
      reply =
        'Connection Risk Analysis: Moderate (34% Risk). Your connecting train departs from Kanpur Central 45 minutes after estimated arrival. If current delay remains under 20 minutes, your connection is safe.';
      suggestions = ['Show alternative trains', 'Book express cab transfer', 'Alert station manager'];
    } else {
      reply =
        `RailPulse AI Assistant: Analyzing query "${message}". All major corridors (NDLS, MMCT, HWH, MAS) are operating at 92% average punctuality. Let me know if you need live radar telemetry, delay diagnosis, or route planning recommendations.`;
      suggestions = ['Where is 12002?', 'Best train from Delhi to Lucknow?', 'Why is 12951 delayed?'];
    }

    return NextResponse.json({
      success: true,
      data: {
        reply,
        suggestions,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
