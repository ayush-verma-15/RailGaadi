'use client';

import React, { useState, useEffect } from 'react';
import { Users, ThumbsUp, MessageSquare, Star, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface ReportItem {
  id: string;
  trainNumber: string;
  trainName: string;
  user: string;
  type: string;
  crowdLevel: string;
  comment: string;
  rating: number;
  upvotes: number;
  createdAt: string;
}

export default function CommunityPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [trainNumber, setTrainNumber] = useState('22436');
  const [reportType, setReportType] = useState('CROWD');
  const [crowdLevel, setCrowdLevel] = useState('Moderate');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch('/api/community')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setReports(json.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const res = await fetch('/api/community', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trainNumber,
        trainName: `#${trainNumber} Express`,
        user: 'Passenger (You)',
        type: reportType,
        crowdLevel,
        comment,
        rating,
      }),
    });
    const json = await res.json();
    if (json.success) {
      setReports((prev) => [json.data, ...prev]);
      setComment('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 py-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono font-black text-2xl text-white">
            <Users className="h-6 w-6 text-cyan-400" />
            <span>Passenger Crowdsourcing Hub</span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time passenger reports on coach crowd levels, cleanliness, catering, and platform updates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-mono font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-md"
        >
          <Plus className="h-4 w-4" /> Submit Live Report
        </button>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {reports.map((rep) => (
          <div key={rep.id} className="glass-panel rounded-3xl p-5 border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
                  #{rep.trainNumber}
                </span>
                <span className="font-bold text-white text-sm">{rep.trainName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={rep.crowdLevel === 'Packed' ? 'rose' : rep.crowdLevel === 'Heavy' ? 'amber' : 'emerald'}>
                  Crowd: {rep.crowdLevel}
                </Badge>
                <Badge variant="cyan">{rep.type}</Badge>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">{rep.comment}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span>Reported by <strong>{rep.user}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="h-3.5 w-3.5 fill-current" /> {rep.rating}/5
                </span>
              </div>

              <div className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 cursor-pointer">
                <ThumbsUp className="h-3.5 w-3.5 text-cyan-400" />
                <span>{rep.upvotes} Upvotes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl glass-panel border-slate-800 p-6 space-y-4">
            <h3 className="font-mono font-bold text-lg text-white">Submit Live Passenger Report</h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400">Train Number</label>
                <input
                  type="text"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="CROWD">Crowd Level</option>
                    <option value="CLEANLINESS">Cleanliness</option>
                    <option value="FOOD">Food Quality</option>
                    <option value="SECURITY">Security</option>
                    <option value="PLATFORM">Platform Change</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Crowd Density</label>
                  <select
                    value={crowdLevel}
                    onChange={(e) => setCrowdLevel(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Packed">Packed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Passenger Observations</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Share details on platform, coach cleanliness, or delay..."
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-4 py-2 font-bold text-slate-950 hover:bg-cyan-400"
                >
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
