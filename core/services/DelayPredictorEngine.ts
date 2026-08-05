import { StationStop, DelayRisk } from '@/types/transit';

/**
 * RailPulse AI - Delay Predictor Engine
 * Uses current velocity, schedule variance, station bottlenecks,
 * and remaining trip distance to compute a predictive Delay Risk Score.
 */
export class DelayPredictorEngine {
  public static calculateDelayRisk(
    currentDelayMinutes: number,
    currentSpeedKmh: number,
    remainingKm: number,
    stations: StationStop[]
  ): DelayRisk {
    let score = 10; // baseline risk score
    let primaryFactor = 'Optimal running conditions';

    // Delay factor
    if (currentDelayMinutes > 60) {
      score += 45;
      primaryFactor = 'Severe schedule deviation at previous bottleneck junction';
    } else if (currentDelayMinutes > 25) {
      score += 30;
      primaryFactor = 'Moderate schedule lag along high-density corridor';
    } else if (currentDelayMinutes > 10) {
      score += 15;
      primaryFactor = 'Minor platform congestion delays';
    }

    // Speed vs expected speed factor
    if (currentSpeedKmh < 40 && remainingKm > 50) {
      score += 25;
      primaryFactor = 'Sub-optimal cruising velocity along active segment';
    } else if (currentSpeedKmh > 100) {
      score = Math.max(0, score - 15);
    }

    // Upcoming stations count factor (dense corridors increase risk)
    const upcomingStations = stations.filter((s) => s.status === 'upcoming');
    if (upcomingStations.length > 8) {
      score += 10;
    }

    // Clamp score between 0 and 100
    const clampedScore = Math.min(100, Math.max(0, Math.round(score)));

    // Risk level classification
    let level: DelayRisk['level'] = 'low';
    if (clampedScore >= 75) level = 'critical';
    else if (clampedScore >= 50) level = 'high';
    else if (clampedScore >= 25) level = 'moderate';

    // Predicted delay delta in minutes
    const predictedDelta = Math.round(currentDelayMinutes + (clampedScore > 40 ? (clampedScore / 100) * 18 : -2));

    return {
      score: clampedScore,
      level,
      primaryFactor,
      predictedDelayDeltaMinutes: Math.max(0, predictedDelta),
      confidence: Math.round(85 + (remainingKm < 100 ? 10 : 0)),
    };
  }
}
