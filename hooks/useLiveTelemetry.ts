import { useQuery } from '@tanstack/react-query';
import { TelemetryReport } from '@/types/transit';

async function fetchTelemetry(vehicleId: string): Promise<TelemetryReport> {
  const res = await fetch(`/api/telemetry/${vehicleId}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Telemetry request failed with status ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

export function useLiveTelemetry(vehicleId: string) {
  return useQuery<TelemetryReport, Error>({
    queryKey: ['telemetry', vehicleId],
    queryFn: () => fetchTelemetry(vehicleId),
    refetchInterval: 30000, // Refresh telemetry every 30 seconds
    staleTime: 15000,
    retry: 2,
    enabled: Boolean(vehicleId),
  });
}

// Backward compatibility alias for legacy components during refactor
export const useLiveJourney = useLiveTelemetry;
