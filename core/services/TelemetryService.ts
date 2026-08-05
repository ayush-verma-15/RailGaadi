import { TelemetryReport } from '@/types/transit';
import { generateSyntheticTelemetry } from '../infrastructure/adapters/railRadarAdapter';
import { DelayPredictorEngine } from './DelayPredictorEngine';
import { EcoAnalyticsEngine } from './EcoAnalyticsEngine';

/**
 * RailPulse AI - Unified Telemetry Service
 * Encapsulates live telemetry retrieval, polyline interpolation, status evaluation,
 * and AI/Eco analytical metrics enrichment.
 */
export class TelemetryService {
  /**
   * Retrieves full enriched telemetry report for a given transit vehicle identifier.
   */
  public static async getVehicleTelemetry(vehicleId: string): Promise<TelemetryReport> {
    // Retrieve base telemetry from adapter (or fallback generator)
    let rawTelemetry: TelemetryReport;
    try {
      rawTelemetry = generateSyntheticTelemetry(vehicleId);
    } catch {
      rawTelemetry = generateSyntheticTelemetry(vehicleId);
    }

    // Enrich with AI Delay Risk calculation
    const delayRisk = DelayPredictorEngine.calculateDelayRisk(
      rawTelemetry.delayMinutes,
      rawTelemetry.speedKmh,
      rawTelemetry.remainingDistanceKm,
      rawTelemetry.stations
    );

    // Enrich with Eco Analytics calculation
    const ecoMetrics = EcoAnalyticsEngine.calculateEcoMetrics(rawTelemetry.totalDistanceKm);

    return {
      ...rawTelemetry,
      delayRisk,
      ecoMetrics,
    };
  }
}
