'use client';

import React from 'react';
import { EcoMetrics } from '@/types/transit';
import { Leaf, Zap, Car, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface EcoMetricsCardProps {
  ecoMetrics?: EcoMetrics;
}

export function EcoMetricsCard({ ecoMetrics }: EcoMetricsCardProps) {
  if (!ecoMetrics) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 font-bold font-mono text-white text-base">
          <Leaf className="h-5 w-5 text-emerald-400" />
          <span>Eco Footprint & Energy Telemetry</span>
        </div>
        <Badge variant="emerald" className="font-mono">
          Rating: {ecoMetrics.efficiencyRating}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* CO2 Saved */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Leaf className="h-4 w-4" />
            <span>CO₂ Saved</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{ecoMetrics.co2SavedKg} kg</div>
          <p className="text-[11px] text-slate-400">vs equivalent road travel</p>
        </div>

        {/* Energy Consumption */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Zap className="h-4 w-4" />
            <span>Energy Use</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{ecoMetrics.energyKwh} kWh</div>
          <p className="text-[11px] text-slate-400">Regenerative electric grid</p>
        </div>

        {/* Car Emissions */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Car className="h-4 w-4" />
            <span>Car Equivalent</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{ecoMetrics.carEquivalentEmissionsKg} kg</div>
          <p className="text-[11px] text-slate-400">Emitted by fossil fuels</p>
        </div>
      </div>
    </div>
  );
}
