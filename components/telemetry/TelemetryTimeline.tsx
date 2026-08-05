'use client';

import React from 'react';
import { StationStop } from '@/types/transit';
import { Badge } from '@/components/common/Badge';
import { MapPin, Clock, CheckCircle2, CircleDot } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TelemetryTimelineProps {
  stations: StationStop[];
  currentStationCode?: string;
}

export function TelemetryTimeline({ stations }: TelemetryTimelineProps) {
  return (
    <div className="glass-panel rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 font-bold font-mono text-white text-base">
          <MapPin className="h-5 w-5 text-cyan-400" />
          <span>Station Telemetry & Schedule</span>
        </div>
        <span className="text-xs font-mono text-slate-400">{stations.length} Stops</span>
      </div>

      <div className="relative space-y-6 before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {stations.map((st, idx) => {
          const isPassed = st.status === 'passed';
          const isCurrent = st.status === 'current';
          const isDelayed = st.delayMinutes > 0;

          return (
            <div key={st.code || idx} className="relative flex items-start gap-4 pl-10 group">
              {/* Timeline Status Bullet */}
              <div
                className={cn(
                  'absolute left-1.5 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
                  isCurrent
                    ? 'border-cyan-400 bg-cyan-500/20 ring-4 ring-cyan-500/20 text-cyan-400'
                    : isPassed
                    ? 'border-emerald-500 bg-slate-950 text-emerald-400'
                    : 'border-slate-700 bg-slate-900 text-slate-600'
                )}
              >
                {isPassed ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : isCurrent ? (
                  <CircleDot className="h-3 w-3 animate-ping" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                )}
              </div>

              {/* Station Details */}
              <div className="flex-1 rounded-2xl bg-slate-900/60 p-3.5 border border-slate-800/80 group-hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{st.name}</span>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded-md">
                        {st.code}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Distance: {st.distanceKm} km {st.platform ? `· Platform ${st.platform}` : ''}
                    </div>
                  </div>

                  {/* Arrival / Departure Badge */}
                  <div className="text-right space-y-1">
                    <div className="font-mono text-xs font-bold text-slate-200 flex items-center gap-1 justify-end">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      <span>{st.scheduledArrival}</span>
                    </div>
                    <Badge variant={isDelayed ? 'amber' : 'emerald'} className="text-[10px] py-0 px-1.5">
                      {isDelayed ? `+${st.delayMinutes}m` : 'On Time'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
