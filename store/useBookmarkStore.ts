import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TransitSearchResult } from '@/types/transit';

interface BookmarkState {
  bookmarks: TransitSearchResult[];
  addBookmark: (transit: TransitSearchResult) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [
        {
          id: '22436',
          number: '22436',
          name: 'Varanasi Vande Bharat Express',
          origin: { code: 'NDLS', name: 'New Delhi' },
          destination: { code: 'BSB', name: 'Varanasi Junction' },
        },
        {
          id: '12951',
          number: '12951',
          name: 'New Delhi Tejas Rajdhani Express',
          origin: { code: 'MMCT', name: 'Mumbai Central' },
          destination: { code: 'NDLS', name: 'New Delhi' },
        },
      ],
      addBookmark: (transit) =>
        set((state) => {
          if (state.bookmarks.some((b) => b.id === transit.id)) return state;
          return { bookmarks: [transit, ...state.bookmarks] };
        }),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),
      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'railpulse-bookmarks-storage',
    }
  )
);
