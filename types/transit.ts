/**
 * RailPulse AI - Domain Entities & Core Types
 * Clean Architecture Domain Layer
 */

export type TransitStatus = 'running' | 'not_started' | 'completed' | 'cancelled';

export type StationPassageStatus = 'passed' | 'current' | 'upcoming';

export interface StationStop {
  code: string;
  name: string;
  lat: number;
  lng: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  delayMinutes: number;
  distanceKm: number;
  status: StationPassageStatus;
  platform?: string;
}

export interface TelemetryLocation {
  lat: number;
  lng: number;
  heading: number;
  speedKmh: number;
  isMoving: boolean;
}

export interface DelayRisk {
  score: number; // 0-100% risk score
  level: 'low' | 'moderate' | 'high' | 'critical';
  primaryFactor: string;
  predictedDelayDeltaMinutes: number;
  confidence: number;
}

export interface EcoMetrics {
  co2SavedKg: number;
  energyKwh: number;
  efficiencyRating: 'A+' | 'A' | 'B' | 'C';
  carEquivalentEmissionsKg: number;
}

export interface TelemetryReport {
  vehicleId: string;
  number: string;
  name: string;
  origin: {
    code: string;
    name: string;
  };
  destination: {
    code: string;
    name: string;
  };
  currentLocation: TelemetryLocation;
  status: TransitStatus;
  delayMinutes: number;
  speedKmh: number;
  distanceCoveredKm: number;
  remainingDistanceKm: number;
  totalDistanceKm: number;
  completionPercentage: number;
  lastUpdated: string;
  ETA: string;
  previousStation?: StationStop;
  currentStation?: StationStop;
  nextStation?: StationStop;
  stations: StationStop[];
  routeGeometry?: [number, number][];
  delayRisk?: DelayRisk;
  ecoMetrics?: EcoMetrics;
}

export interface TransitSearchResult {
  id: string;
  number: string;
  name: string;
  origin: {
    code: string;
    name: string;
  };
  destination: {
    code: string;
    name: string;
  };
}
