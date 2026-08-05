import { EcoMetrics } from '@/types/transit';

/**
 * RailPulse AI - Eco Analytics Engine
 * Calculates sustainability metrics, carbon offset, and energy efficiency.
 */
export class EcoAnalyticsEngine {
  // Average CO2 per passenger-km: Train = ~0.035 kg, Car = ~0.170 kg, Flight = ~0.255 kg
  private static readonly TRAIN_CO2_PER_KM = 0.035;
  private static readonly CAR_CO2_PER_KM = 0.17;
  private static readonly KWH_PER_KM = 0.42;

  public static calculateEcoMetrics(distanceKm: number): EcoMetrics {
    const totalKm = Math.max(1, distanceKm);
    const trainEmissions = totalKm * this.TRAIN_CO2_PER_KM;
    const carEmissions = totalKm * this.CAR_CO2_PER_KM;
    const co2Saved = Math.round((carEmissions - trainEmissions) * 10) / 10;
    const energyKwh = Math.round(totalKm * this.KWH_PER_KM);

    let efficiencyRating: EcoMetrics['efficiencyRating'] = 'A+';
    if (totalKm > 1000) efficiencyRating = 'A+';
    else if (totalKm > 500) efficiencyRating = 'A';
    else if (totalKm > 200) efficiencyRating = 'B';
    else efficiencyRating = 'C';

    return {
      co2SavedKg: Math.max(0, co2Saved),
      energyKwh,
      efficiencyRating,
      carEquivalentEmissionsKg: Math.round(carEmissions * 10) / 10,
    };
  }
}
