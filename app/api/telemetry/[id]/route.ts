import { NextRequest, NextResponse } from 'next/server';
import { TelemetryService } from '@/core/services/TelemetryService';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicleId = params.id;
    if (!vehicleId) {
      return NextResponse.json({ success: false, error: 'Vehicle ID required' }, { status: 400 });
    }

    const telemetry = await TelemetryService.getVehicleTelemetry(vehicleId);
    return NextResponse.json({ success: true, data: telemetry });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch telemetry' }, { status: 500 });
  }
}
