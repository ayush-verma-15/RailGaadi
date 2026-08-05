'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio, ArrowRight, Sparkles, Clock, History, Search, Loader2,
  AlertCircle, X, Zap, ShieldAlert, Activity, Leaf, Compass
} from 'lucide-react';
import { useTransitSearch } from '@/hooks/useTransitSearch';
import { useSearchStore } from '@/store/useSearchStore';
import { TransitSearchResult } from '@/types/transit';
import { cn } from '@/utils/cn';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export default function CommandConsolePage() {
  const router = useRouter();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();
  const [inputValue, setInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debouncedQuery = useDebounce(inputValue, 350);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading, isError } = useTransitSearch(debouncedQuery);

  // ⌘K Keyboard Shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Outside click handler
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (transit: TransitSearchResult) => {
    addRecentSearch(transit);
    setIsSearchOpen(false);
    setInputValue('');
    router.push(`/telemetry/${transit.number}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const first = searchResults?.[0];
      if (first) handleSelect(first);
      else router.push(`/telemetry/${inputValue.trim()}`);
    }
  };

  const showDropdown = isSearchOpen && (inputValue || debouncedQuery);

  return (
    <div className="space-y-12 py-4">
      {/* ─── Hero Command Console ────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-cyan-950/40 via-slate-900/60 to-slate-950 p-8 md:p-14 border border-cyan-500/20 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-bold text-cyan-400 backdrop-blur-md">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>Next-Gen Transit Telemetry · Powered by RailPulse AI</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl font-sans">
            Real-Time Railway <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Telemetry Console.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Instant vector radar tracking, AI-powered delay risk scoring, eco footprint analytics, and station dispatch schedule across India.
          </p>

          {/* Search Dispatch Input */}
          <div className="mt-8 relative max-w-xl mx-auto text-left">
            <div
              className={cn(
                'glass-panel flex items-center gap-3 rounded-2xl px-4 py-4 transition-all duration-300 border-slate-800',
                isSearchOpen ? 'border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30' : ''
              )}
            >
              {isLoading && inputValue ? (
                <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
              ) : (
                <Search className="h-5 w-5 text-slate-400" />
              )}

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Enter train number (e.g. 22436) or route (Rajdhani)..."
                className="w-full bg-transparent text-sm font-mono font-medium text-white placeholder-slate-500 outline-none"
              />

              {inputValue && (
                <button
                  onClick={() => { setInputValue(''); setIsSearchOpen(false); }}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400">
                ⌘ K
              </kbd>
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-full mt-2 z-50 max-h-[380px] overflow-y-auto rounded-2xl glass-panel p-3 border border-slate-800 shadow-2xl space-y-1"
                >
                  {isError && (
                    <div className="flex items-center gap-2 py-4 justify-center text-xs text-rose-400 font-mono">
                      <AlertCircle className="h-4 w-4" />
                      <span>Telemetry search offline. Try again.</span>
                    </div>
                  )}

                  {!isLoading && !isError && searchResults?.length === 0 && (
                    <div className="py-6 text-center text-xs font-mono text-slate-400">
                      No matching transit vehicles found. Try <strong>22436</strong> or <strong>12951</strong>.
                    </div>
                  )}

                  {searchResults && searchResults.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-widest font-mono text-slate-400 px-2 pt-1 pb-2">
                        Active Transit Telemetry Match
                      </div>
                      {searchResults.map((transit) => (
                        <button
                          key={transit.id}
                          onClick={() => handleSelect(transit)}
                          className="w-full flex items-center justify-between rounded-xl p-3 transition-all duration-150 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-mono font-black group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                              #{transit.number.slice(0, 3)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-cyan-400">#{transit.number}</span>
                                <span className="font-bold text-white text-sm">{transit.name}</span>
                              </div>
                              {transit.origin.name && (
                                <div className="text-[11px] font-mono text-slate-400">
                                  {transit.origin.name} → {transit.destination.name}
                                </div>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Launch Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold">Featured Corridors:</span>
            {['22436', '12951', '12001', '12301'].map((num) => (
              <button
                key={num}
                onClick={() => router.push(`/telemetry/${num}`)}
                className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
              >
                #{num}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Recent Telemetry Searches ─────────────────────────────────────── */}
      {recentSearches.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold font-mono text-lg text-white">
              <History className="h-5 w-5 text-cyan-400" />
              <span>Recent Telemetry Monitors</span>
            </div>
            <button
              onClick={clearRecentSearches}
              className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors"
            >
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentSearches.map((transit) => (
              <Link
                key={transit.id}
                href={`/telemetry/${transit.number}`}
                className="glass-panel group flex items-center justify-between rounded-2xl p-4 transition-all duration-200 hover:border-cyan-500/30 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-mono font-bold group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    🚆
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400 block">#{transit.number}</span>
                    <h4 className="font-bold text-white text-xs truncate max-w-[140px]">{transit.name}</h4>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Feature Matrix Grid ───────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Activity className="h-6 w-6 text-cyan-400" />,
            title: 'Vector Telemetry Mesh',
            desc: 'Real-time vector polyline map with smooth train position interpolation and camera follow mode.',
          },
          {
            icon: <ShieldAlert className="h-6 w-6 text-amber-400" />,
            title: 'AI Delay Risk Predictor',
            desc: 'Calculates dynamic bottleneck delay risk scores based on velocity, schedule lag, and corridor density.',
          },
          {
            icon: <Leaf className="h-6 w-6 text-emerald-400" />,
            title: 'Eco Emissions Dashboard',
            desc: 'Computes CO₂ saved vs car/flight travel and tracks electric grid energy efficiency for every trip.',
          },
        ].map((f, i) => (
          <div key={i} className="glass-panel rounded-3xl p-6 space-y-3 border-slate-800/80">
            <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="font-bold font-mono text-lg text-white">{f.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
