'use client';

import React from 'react';
import { Activity, Clock, ShieldCheck, Zap, Leaf, TrendingUp, Gauge, Radio, MapPin } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

export default function AnalyticsDashboardPage() {
  const kpis = [
    { label: 'Average System Delay', value: '14.2 min', sub: '-3.1m vs yesterday', icon: Clock, color: 'text-amber-400' },
    { label: 'System Punctuality Rate', value: '92.4%', sub: '+1.8% target rate', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Daily Active Express Fleet', value: '142 Trains', sub: 'Across 48 Corridor Zones', icon: Radio, color: 'text-cyan-400' },
    { label: 'Stations Telemetry Network', value: '4,820 Stations', sub: '100% GIS Coverage', icon: MapPin, color: 'text-sky-400' },
    { label: 'Fleet Average Velocity', value: '118 km/h', sub: 'High-speed line peak', icon: Gauge, color: 'text-cyan-400' },
    { label: 'Longest Active Lag', value: '84 min', sub: 'Kanpur Freight Line', icon: Activity, color: 'text-rose-400' },
    { label: 'CO₂ Footprint Offset', value: '12.45 Tons', sub: 'Saved vs road transport', icon: Leaf, color: 'text-emerald-400' },
    { label: 'Grid Power Efficiency', value: '48.2 MWh', sub: 'Regenerative Braking 32%', icon: Zap, color: 'text-cyan-400' },
  ];

  const corridorData = [
    { corridor: 'Delhi - Mumbai Corridor (12951)', delay: '4.2 min', punctuality: '96%', speed: '130 km/h', status: 'Optimal' },
    { corridor: 'Delhi - Varanasi Vande Bharat (22436)', delay: '1.0 min', punctuality: '99%', speed: '130 km/h', status: 'Optimal' },
    { corridor: 'Delhi - Howrah Rajdhani (12301)', delay: '18.5 min', punctuality: '88%', speed: '120 km/h', status: 'Bottleneck' },
    { corridor: 'Delhi - Chennai Rajdhani (12433)', delay: '12.0 min', punctuality: '91%', speed: '115 km/h', status: 'Moderate' },
    { corridor: 'Mumbai - Solapur Vande Bharat (20901)', delay: '2.5 min', punctuality: '97%', speed: '110 km/h', status: 'Optimal' },
  ];

  return (
    <div className="space-y-8 py-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
          <Activity className="h-6 w-6 text-cyan-400" />
          <span>National Transit Analytics & Operations Hub</span>
        </div>
        <p className="text-xs text-slate-400">
          Executive performance metrics, system punctuality rates, corridor velocities, and eco impact metrics.
        </p>
      </div>

      {/* Primary KPI Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="glass-panel rounded-3xl p-5 border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black font-mono text-white tracking-tight">{kpi.value}</div>
              <div className="text-[11px] font-mono text-slate-500">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Punctuality Distribution Chart Visualizer */}
        <Card className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span>Corridor Punctuality & Delay Distribution</span>
            </div>
            <Badge variant="emerald">Live 24h Telemetry</Badge>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {[
              { label: 'On Time (0 - 5 min delay)', pct: 82, color: 'bg-emerald-500' },
              { label: 'Minor Delay (6 - 15 min)', pct: 10, color: 'bg-cyan-500' },
              { label: 'Moderate Lag (16 - 30 min)', pct: 5, color: 'bg-amber-500' },
              { label: 'Severe Delay (30+ min)', pct: 3, color: 'bg-rose-500' },
            ].map((bar, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>{bar.label}</span>
                  <span className="font-bold text-white">{bar.pct}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800">
                  <div className={`h-full rounded-full ${bar.color} transition-all duration-500`} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Flagship Corridor Status Matrix */}
        <Card className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
              <Radio className="h-5 w-5 text-cyan-400" />
              <span>Corridor Efficiency</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {corridorData.map((c, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900/90 p-3.5 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-sans text-xs">{c.corridor}</span>
                  <Badge variant={c.status === 'Optimal' ? 'emerald' : c.status === 'Moderate' ? 'amber' : 'rose'}>
                    {c.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Avg Delay: <strong className="text-white">{c.delay}</strong></span>
                  <span>Punctuality: <strong className="text-cyan-400">{c.punctuality}</strong></span>
                  <span>Velocity: <strong className="text-emerald-400">{c.speed}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
