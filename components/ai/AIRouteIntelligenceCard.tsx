'use client';

import React from 'react';
import { Sparkles, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface AIRouteIntelligenceCardProps {
  trainNumber: string;
  delayMinutes: number;
}

export function AIRouteIntelligenceCard({ trainNumber, delayMinutes }: AIRouteIntelligenceCardProps) {
  const isSevere = delayMinutes > 40;

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-4 border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <span>AI Delay Explanation & Recovery Forecast</span>
        </div>
        <Badge variant={isSevere ? 'rose' : 'amber'}>
          {isSevere ? 'Severe Congestion' : 'Moderate Bottleneck'}
        </Badge>
      </div>

      <div className="space-y-3 font-sans text-xs">
        <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-mono text-cyan-400 font-bold">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Root Cause Diagnosis</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Train #{trainNumber} delay ({delayMinutes} min) is primarily attributed to <strong>heavy freight congestion near Kanpur Central</strong> combined with scheduled platform track maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
          <div className="rounded-2xl bg-slate-900/90 p-3.5 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Expected Recovery
            </div>
            <div className="text-sm font-bold text-emerald-400">12 - 15 minutes</div>
            <p className="text-[10px] text-slate-500 font-sans">Projected before Prayagraj Junction</p>
          </div>

          <div className="rounded-2xl bg-slate-900/90 p-3.5 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" /> Dispatch Priority
            </div>
            <div className="text-sm font-bold text-cyan-400">Class 1 Superfast</div>
            <p className="text-[10px] text-slate-500 font-sans">High signal precedence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
