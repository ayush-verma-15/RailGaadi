'use client';

import React from 'react';
import { TelemetryReport } from '@/types/transit';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { Activity, Clock, ShieldAlert, Zap, RefreshCw, ArrowRight, Gauge, Leaf } from 'lucide-react';

interface VehicleHeaderCardProps {
  telemetry: TelemetryReport;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function VehicleHeaderCard({ telemetry, onRefresh, isRefreshing }: VehicleHeaderCardProps) {
  const isDelayed = telemetry.delayMinutes > 0;

  return (
    <Card glow className="space-y-6">
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
              #{telemetry.number}
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">{telemetry.name}</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{telemetry.origin.name} ({telemetry.origin.code})</span>
            <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
            <span>{telemetry.destination.name} ({telemetry.destination.code})</span>
          </div>
        </div>

        {/* Quick Actions & Refresh */}
        <div className="flex items-center gap-3">
          <Badge variant={isDelayed ? 'amber' : 'emerald'}>
            <Clock className="h-3.5 w-3.5" />
            {isDelayed ? `+${telemetry.delayMinutes}m Delay` : 'On Schedule'}
          </Badge>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Speed Gauge */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Gauge className="h-4 w-4 text-cyan-400" />
            <span>Velocity</span>
          </div>
          <div className="text-xl font-black text-white font-mono">
            {telemetry.speedKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
          </div>
        </div>

        {/* Distance Metrics */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="h-4 w-4 text-sky-400" />
            <span>Progress</span>
          </div>
          <div className="text-xl font-black text-white font-mono">
            {telemetry.distanceCoveredKm} <span className="text-xs font-normal text-slate-400">/ {telemetry.totalDistanceKm} km</span>
          </div>
        </div>

        {/* AI Delay Risk Score */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <span>AI Risk Index</span>
          </div>
          <div className="text-xl font-black text-amber-400 font-mono">
            {telemetry.delayRisk?.score || 12}% <span className="text-xs font-normal text-slate-400">Risk</span>
          </div>
        </div>

        {/* Eco Emissions Rating */}
        <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Leaf className="h-4 w-4 text-emerald-400" />
            <span>Eco Rating</span>
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {telemetry.ecoMetrics?.efficiencyRating || 'A+'} <span className="text-xs font-normal text-slate-400">Saved {telemetry.ecoMetrics?.co2SavedKg || 45}kg CO₂</span>
          </div>
        </div>
      </div>

      {/* Route Completion Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Route Completion</span>
          <span className="text-cyan-400 font-bold">{telemetry.completionPercentage}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-500 shadow-glow"
            style={{ width: `${Math.min(100, Math.max(0, telemetry.completionPercentage))}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
