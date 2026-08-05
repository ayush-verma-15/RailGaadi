'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TRANSIT_DATABASE, TransitDbEntry } from '@/core/infrastructure/database/transitDb';
import { Radio, ArrowRight, Gauge, Filter } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

export default function FleetMatrixPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Vande Bharat', 'Rajdhani', 'Shatabdi', 'Duronto', 'Superfast'];

  const filteredFleet =
    activeCategory === 'All'
      ? TRANSIT_DATABASE
      : TRANSIT_DATABASE.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6 py-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
            <Radio className="h-6 w-6 text-cyan-400 animate-pulse" />
            <span>National Fleet Dispatch Matrix</span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time status matrix for all active express corridors across Indian Railways.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl glass-panel p-1 border-slate-800 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-3 py-1.5 font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFleet.map((train: TransitDbEntry) => (
          <div
            key={train.number}
            className="glass-panel group rounded-3xl p-5 border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
                #{train.number}
              </span>
              <Badge variant={train.category === 'Vande Bharat' ? 'emerald' : 'cyan'}>
                {train.category}
              </Badge>
            </div>

            <div>
              <h3 className="font-bold text-white text-base leading-snug">{train.name}</h3>
              <div className="text-xs font-mono text-slate-400 mt-1">
                {train.from} ({train.fromCode}) → {train.to} ({train.toCode})
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
              <div className="flex items-center gap-1 text-slate-400">
                <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                <span>Avg {train.avgSpeedKmh} km/h</span>
              </div>

              <Link
                href={`/telemetry/${train.number}`}
                className="flex items-center gap-1 font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Track Radar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
