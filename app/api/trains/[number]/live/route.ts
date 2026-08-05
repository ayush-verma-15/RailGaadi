import { NextRequest, NextResponse } from 'next/server';
import { TelemetryService } from '@/core/services/TelemetryService';

export async function GET(req: NextRequest, { params }: { params: { number: string } }) {
  try {
    const trainNumber = params.number;
    const telemetry = await TelemetryService.getVehicleTelemetry(trainNumber);
    return NextResponse.json({ success: true, data: telemetry });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Live telemetry failed' }, { status: 500 });
  }
}
