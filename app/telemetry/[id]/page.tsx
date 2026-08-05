'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Check, Radio, MapPin, ShieldAlert, Leaf, Bookmark } from 'lucide-react';
import { useLiveTelemetry } from '@/hooks/useLiveTelemetry';
import { VehicleHeaderCard } from '@/components/telemetry/VehicleHeaderCard';
import { TelemetryTimeline } from '@/components/telemetry/TelemetryTimeline';
import { DelayRiskCard } from '@/components/analytics/DelayRiskCard';
import { EcoMetricsCard } from '@/components/analytics/EcoMetricsCard';
import { Badge } from '@/components/common/Badge';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import dynamic from 'next/dynamic';

const RadarMapView = dynamic(() => import('@/components/radar/RadarMapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-3xl bg-slate-900 border border-slate-800 animate-pulse text-xs font-mono text-slate-500">
      Initializing Radar Vector Mesh...
    </div>
  ),
});

const TABS = [
  { id: 'map', label: 'Live Radar Mesh', icon: MapPin },
  { id: 'analytics', label: 'AI Delay Predictor', icon: ShieldAlert },
  { id: 'eco', label: 'Eco Footprint', icon: Leaf },
] as const;

type TabId = typeof TABS[number]['id'];

export default function TelemetryDetailPage({ params }: { params: { id: string } }) {
  const vehicleId = params.id;
  const { data: telemetry, isLoading, isError, refetch, isRefetching } = useLiveTelemetry(vehicleId);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('map');

  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const bookmarked = isBookmarked(vehicleId);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleBookmark = () => {
    if (!telemetry) return;
    if (bookmarked) {
      removeBookmark(vehicleId);
    } else {
      addBookmark({
        id: telemetry.vehicleId,
        number: telemetry.number,
        name: telemetry.name,
        origin: telemetry.origin,
        destination: telemetry.destination,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 py-8 font-mono">
        <div className="h-8 w-40 rounded-xl bg-slate-900 animate-pulse" />
        <div className="h-48 w-full rounded-3xl bg-slate-900 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-[460px] rounded-3xl bg-slate-900 animate-pulse" />
          <div className="lg:col-span-4 h-[460px] rounded-3xl bg-slate-900 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !telemetry) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Command Console
        </Link>

        <div className="glass-panel rounded-3xl p-8 space-y-4 border-slate-800">
          <Radio className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
          <h2 className="text-xl font-bold font-mono text-white">Telemetry Signal Unavailable</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Could not resolve live telemetry for vehicle #{vehicleId}. The vehicle may be out of coverage or between scheduled runs.
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            Retry Telemetry Fetch
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap font-mono">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
        >
          <ArrowLeft className="h-4 w-4 text-cyan-400" /> Back to Console
        </Link>

        <div className="flex items-center gap-3">
          <Badge variant={telemetry.status === 'running' ? 'emerald' : 'amber'}>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            {telemetry.status.toUpperCase()}
          </Badge>

          {/* Bookmark Watchlist Button */}
          <button
            onClick={handleToggleBookmark}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
              bookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>{bookmarked ? 'Bookmarked' : 'Add Watchlist'}</span>
          </button>

          {/* Share Link Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? 'Copied Link' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Vehicle Header Card */}
      <VehicleHeaderCard telemetry={telemetry} onRefresh={() => refetch()} isRefreshing={isRefetching} />

      {/* Tab Selector */}
      <div className="flex items-center gap-2 rounded-2xl glass-panel p-1.5 w-fit border-slate-800">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono font-bold transition-all ${
              activeTab === id
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Tab Component View */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {activeTab === 'map' && <RadarMapView telemetry={telemetry} className="h-[460px] w-full" />}
          {activeTab === 'analytics' && <DelayRiskCard delayRisk={telemetry.delayRisk} />}
          {activeTab === 'eco' && <EcoMetricsCard ecoMetrics={telemetry.ecoMetrics} />}
        </div>

        {/* Station Telemetry Timeline */}
        <div className="lg:col-span-5 xl:col-span-4">
          <TelemetryTimeline stations={telemetry.stations} currentStationCode={telemetry.currentStation?.code} />
        </div>
      </div>
    </div>
  );
}
