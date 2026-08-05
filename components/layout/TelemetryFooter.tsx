import React from 'react';
import { Radio, ShieldCheck, Activity, Zap } from 'lucide-react';

export function TelemetryFooter() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 py-10 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-cyan-400" />
              <span className="font-extrabold font-mono text-white text-base">RAILPULSE AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise-grade railway telemetry, route intelligence, and delay prediction matrix for Indian Railways.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-widest mb-3">Core Engines</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-cyan-400" /> Live Vector Telemetry
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-emerald-400" /> AI Delay Risk Engine
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Eco CO₂ Impact Metrics
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-widest mb-3">Coverage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracking 100+ flagship express routes, Vande Bharat semi-high speed corridors, and Rajdhani express trains in real-time.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-widest mb-3">System Health</h4>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Polling Frequency</span>
                <span className="text-cyan-400 font-bold">30s Live</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>GIS Vector Mode</span>
                <span className="text-emerald-400 font-bold">MapLibre Dark</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status</span>
                <span className="text-emerald-400 font-bold">Optimal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/60 pt-6 text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} RailPulse AI. Built with modern Next.js 14, Zustand, MapLibre & Clean Architecture.
        </div>
      </div>
    </footer>
  );
}
