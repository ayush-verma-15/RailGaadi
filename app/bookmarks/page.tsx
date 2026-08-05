'use client';

import React from 'react';
import Link from 'next/link';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { Bookmark, ArrowRight, Trash2, Radio } from 'lucide-react';
import { Card } from '@/components/common/Card';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarkStore();

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
            <Bookmark className="h-6 w-6 text-cyan-400" />
            <span>Watchlist Telemetry Hub</span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Saved priority transit monitors with continuous telemetry access.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" /> Clear Watchlist
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <Card className="text-center py-16 space-y-4">
          <Radio className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold font-mono text-white">Watchlist Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
            You have not bookmarked any transit monitors yet. Add express trains from the Search Console.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition-all"
          >
            Go to Dispatch Console
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((transit) => (
            <div
              key={transit.id}
              className="glass-panel group rounded-3xl p-5 border-slate-800 space-y-4 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
                  #{transit.number}
                </span>
                <button
                  onClick={() => removeBookmark(transit.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h3 className="font-bold text-white text-base font-sans">{transit.name}</h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {transit.origin.name || 'Origin'} → {transit.destination.name || 'Destination'}
                </div>
              </div>

              <Link
                href={`/telemetry/${transit.number}`}
                className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-mono font-bold text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all"
              >
                <span>Launch Telemetry Radar</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
