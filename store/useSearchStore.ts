import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TransitSearchResult } from '@/types/transit';

interface SearchStoreState {
  recentSearches: TransitSearchResult[];
  addRecentSearch: (item: TransitSearchResult) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStoreState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addRecentSearch: (item) =>
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s.id !== item.id);
          return { recentSearches: [item, ...filtered].slice(0, 8) };
        }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'railpulse-recent-searches',
    }
  )
);
