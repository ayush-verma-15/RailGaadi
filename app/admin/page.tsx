'use client';

import React from 'react';
import { Shield, Server, Cpu, Database, Activity, CheckCircle2, AlertTriangle, Users, FileText } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

export default function AdminControlPage() {
  const healthMetrics = [
    { label: 'REST & GraphQL API Gateway', status: 'Healthy', latency: '42 ms', uptime: '99.98%' },
    { label: 'Gemini AI Intelligent Engine', status: 'Healthy', latency: '280 ms', uptime: '99.90%' },
    { label: 'PostgreSQL + Prisma DB', status: 'Healthy', latency: '12 ms', uptime: '100%' },
    { label: 'Redis Telemetry Cache', status: 'Healthy', latency: '2 ms', uptime: '100%' },
  ];

  return (
    <div className="space-y-8 py-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span>System Administration & AI Telemetry Console</span>
        </div>
        <p className="text-xs text-slate-400">
          Monitor API gateways, Prisma PostgreSQL connections, AI token consumption, and manage fleet schedules.
        </p>
      </div>

      {/* Infrastructure Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {healthMetrics.map((h, idx) => (
          <div key={idx} className="glass-panel rounded-3xl p-5 border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">{h.label}</span>
              <Badge variant="emerald">
                <CheckCircle2 className="h-3 w-3" /> {h.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
              <span>Latency: <strong className="text-cyan-400">{h.latency}</strong></span>
              <span>Uptime: <strong className="text-emerald-400">{h.uptime}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Token Usage Meter & System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <span>AI Token Consumption & Usage Meter</span>
            </div>
            <Badge variant="cyan">Gemini 1.5 Flash</Badge>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Monthly API Tokens</span>
                <span className="font-bold text-cyan-400">142,850 / 1,000,000</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800">
                <div className="h-full rounded-full bg-cyan-500" style={{ width: '14.2%' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl bg-slate-900/80 p-3 border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase">Avg Prompt Latency</span>
                <div className="text-base font-bold text-white">320 ms</div>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-3 border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase">Daily Chat Invocations</span>
                <div className="text-base font-bold text-emerald-400">1,840 queries</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Audit Logs */}
        <Card className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-base">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span>Security & Audit Gateway Logs</span>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-[11px]">
            {[
              { time: '11:10:45', event: 'REST API GET /api/trains/22436/live', code: '200 OK', lat: '14ms' },
              { time: '11:08:12', event: 'Gemini AI Assistant Chat Prompt Processed', code: '200 OK', lat: '240ms' },
              { time: '11:02:04', event: 'Prisma PostgreSQL Bookmark Persisted', code: '201 Created', lat: '18ms' },
              { time: '10:54:30', event: 'Community Report Moderated (#rep-1)', code: '200 OK', lat: '8ms' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-slate-900/90 p-2.5 border border-slate-800 text-slate-300">
                <span className="text-slate-500">{log.time}</span>
                <span className="font-bold text-white truncate max-w-[240px]">{log.event}</span>
                <span className="text-emerald-400 font-bold">{log.code}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
