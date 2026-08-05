'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Route, ArrowRight, Clock, Zap, Leaf, Compass } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

const STATIONS = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'MMCT', name: 'Mumbai Central' },
  { code: 'HWH', name: 'Howrah Junction' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'BSB', name: 'Varanasi Junction' },
  { code: 'SBC', name: 'Bengaluru City' },
];

export default function RoutePlannerPage() {
  const [origin, setOrigin] = useState('NDLS');
  const [destination, setDestination] = useState('MMCT');

  return (
    <div className="space-y-6 py-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
          <Route className="h-6 w-6 text-cyan-400" />
          <span>Inter-Corridor Route Planner</span>
        </div>
        <p className="text-xs text-slate-400">
          Simulate connection paths, estimated trip duration, and carbon offset across railway hubs.
        </p>
      </div>

      {/* Selector Box */}
      <Card glow className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Origin Terminal</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-3.5 text-sm font-mono font-bold text-white outline-none focus:border-cyan-500"
            >
              {STATIONS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Destination Terminal</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-3.5 text-sm font-mono font-bold text-white outline-none focus:border-cyan-500"
            >
              {STATIONS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Overview */}
        <div className="rounded-2xl bg-slate-900/90 p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-cyan-400">
              <span>{origin}</span>
              <ArrowRight className="h-4 w-4" />
              <span>{destination}</span>
            </div>
            <Badge variant="emerald">Direct Express Connection</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-cyan-400" /> Duration
              </div>
              <div className="text-base font-bold text-white">15h 30m</div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-emerald-400" /> Avg Speed
              </div>
              <div className="text-base font-bold text-white">130 km/h</div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Leaf className="h-3.5 w-3.5 text-emerald-400" /> CO₂ Offset
              </div>
              <div className="text-base font-bold text-white">186.2 kg</div>
            </div>
          </div>

          <Link
            href="/telemetry/12951"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-cyan-500 py-3 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md"
          >
            <span>Launch Live Telemetry Radar (#12951 Tejas Rajdhani)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
