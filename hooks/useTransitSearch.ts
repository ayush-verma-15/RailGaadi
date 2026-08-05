import { useQuery } from '@tanstack/react-query';
import { TransitSearchResult } from '@/types/transit';

async function executeSearch(query: string): Promise<TransitSearchResult[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  const json = await res.json();
  return json.data || [];
}

export function useTransitSearch(query: string) {
  return useQuery<TransitSearchResult[], Error>({
    queryKey: ['transitSearch', query],
    queryFn: () => executeSearch(query),
    staleTime: 60000, // 1 minute cache
    enabled: true,
  });
}

// Alias for compatibility
export const useTrainSearch = useTransitSearch;
