'use client';

import React from 'react';
import { DelayRisk } from '@/types/transit';
import { ShieldAlert, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface DelayRiskCardProps {
  delayRisk?: DelayRisk;
}

export function DelayRiskCard({ delayRisk }: DelayRiskCardProps) {
  if (!delayRisk) return null;

  const levelColor = {
    low: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    moderate: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    high: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    critical: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  }[delayRisk.level];

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 font-bold font-mono text-white text-base">
          <ShieldAlert className="h-5 w-5 text-cyan-400" />
          <span>AI Delay Risk & Bottleneck Predictor</span>
        </div>
        <Badge variant="cyan" className="font-mono">
          Confidence: {delayRisk.confidence}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Risk Score Circle */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-900/80 p-4 border border-slate-800">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-xl font-black font-mono ${levelColor}`}>
            {delayRisk.score}%
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Risk Level</div>
            <div className="text-base font-bold text-white uppercase tracking-tight">{delayRisk.level} Risk</div>
          </div>
        </div>

        {/* Predicted Delta */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-900/80 p-4 border border-slate-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xl font-black font-mono">
            +{delayRisk.predictedDelayDeltaMinutes}m
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Predicted Arrival Delta</div>
            <div className="text-sm font-bold text-white">Estimated ETA Variance</div>
          </div>
        </div>
      </div>

      {/* Primary Factor Signal */}
      <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Zap className="h-3.5 w-3.5" />
          <span>Primary Bottleneck Signal</span>
        </div>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">{delayRisk.primaryFactor}</p>
      </div>
    </div>
  );
}
