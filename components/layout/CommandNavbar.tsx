'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Map, Bookmark, Route, Activity, Sparkles, Users, Shield, Bot } from 'lucide-react';
import { AIAssistantWidget } from '@/components/ai/AIAssistantWidget';
import { cn } from '@/utils/cn';

export function CommandNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Console', href: '/', icon: Activity },
    { label: 'Fleet Matrix', href: '/fleet', icon: Radio },
    { label: 'Planner', href: '/planner', icon: Route },
    { label: 'Analytics', href: '/analytics', icon: Activity },
    { label: 'Community', href: '/community', icon: Users },
    { label: 'Watchlist', href: '/bookmarks', icon: Bookmark },
    { label: 'Admin Panel', href: '/admin', icon: Shield },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 font-sans">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-white text-lg font-mono">RAILPULSE</span>
                <span className="rounded-md bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-cyan-400 border border-cyan-500/30">
                  AI 2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight">Transit Telemetry Engine</p>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 font-mono text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-bold transition-all duration-200',
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Quick Action Link */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Radar Mesh Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Global AI Assistant Floating Chatbot Drawer */}
      <AIAssistantWidget />
    </>
  );
}
