'use client';

import React from 'react';
import { AlertCircle, Train, Bus, Car, Hotel, Compass, ArrowRight, X } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface SmartRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainNumber: string;
  delayMinutes: number;
}

export function SmartRecommendationModal({ isOpen, onClose, trainNumber, delayMinutes }: SmartRecommendationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 font-sans">
      <div className="w-full max-w-xl rounded-3xl glass-panel border-slate-800 p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-rose-400" />
            <h2 className="text-xl font-bold font-mono text-white">Smart Multimodal Recommendations</h2>
          </div>
          <p className="text-xs text-slate-400">
            Train #{trainNumber} has severe delay (+{delayMinutes}m). Explore optimal alternative transfers below.
          </p>
        </div>

        {/* Recommendation Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          {/* Alternative Train */}
          <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Train className="h-4 w-4" /> Alternative Train
              </div>
              <Badge variant="emerald">Departs +25m</Badge>
            </div>
            <p className="text-white font-sans text-xs font-bold">#20901 Vande Bharat Express</p>
            <p className="text-slate-400 text-[11px]">Platform 1 · On Time · 94 Seats Available</p>
          </div>

          {/* Nearby Bus */}
          <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Bus className="h-4 w-4" /> Interstate Volvo Bus
              </div>
              <Badge variant="cyan">ISBT Hub (1.2 km)</Badge>
            </div>
            <p className="text-white font-sans text-xs font-bold">UPSRTC Volvo AC Sleeper</p>
            <p className="text-slate-400 text-[11px]">Next Bus: 18:30 · Duration: 6h 10m</p>
          </div>

          {/* Cab Service */}
          <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Car className="h-4 w-4" /> Express Highway Cab
              </div>
              <Badge variant="amber">4 min Pickup</Badge>
            </div>
            <p className="text-white font-sans text-xs font-bold">Uber / Ola Intercity Sedan</p>
            <p className="text-slate-400 text-[11px]">Est. Cost: ₹2,450 · Direct Highway</p>
          </div>

          {/* Hotel Stay */}
          <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <Hotel className="h-4 w-4" /> Executive Lounge & Hotel
              </div>
              <Badge variant="slate">Station Plaza</Badge>
            </div>
            <p className="text-white font-sans text-xs font-bold">IRCTC Executive Rest Lounge</p>
            <p className="text-slate-400 text-[11px]">Rate: ₹450 / 3 hrs · AC Pod Pods Available</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-2xl bg-cyan-500 py-3 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md"
        >
          Dismiss Recommendations
        </button>
      </div>
    </div>
  );
}
