import React, { useState } from 'react';

export default function VelocityMonitor({ onSelectAnomaly }) {
  const [filterThreshold, setFilterThreshold] = useState('>300%');
  const [activePlatform, setActivePlatform] = useState('all');

  const anomalies = [
    {
      id: 'anomaly-1',
      platform: 'TikTok',
      platformColor: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
      title: 'Enterprise Salary Negotiation Proof-of-Work Matrix',
      author: '@growth_lead_tech',
      surge: '+482% / MIN',
      surgeMultiplier: '4.8x Spike',
      retentionScore: '91.2% @ 3s',
      sharesPerMin: '128 shares/min',
      saturation: 'Early Curve (< 12%)',
      audioHook: '94.0% Audio Velocity',
      sparkline: 'M0 28 Q 20 25, 40 22 T 80 15 T 120 18 T 160 8 T 200 2'
    },
    {
      id: 'anomaly-2',
      platform: 'YouTube Shorts',
      platformColor: 'text-red-400 border-red-500/20 bg-red-500/10',
      title: 'Why 99% of Devs Fail Principal Level System Design',
      author: '@arch_patterns_hq',
      surge: '+520% / MIN',
      surgeMultiplier: '5.2x Spike',
      retentionScore: '93.5% @ 3s',
      sharesPerMin: '184 shares/min',
      saturation: 'Early Curve (< 9%)',
      audioHook: '88.2% Audio Velocity',
      sparkline: 'M0 26 Q 30 24, 60 19 T 110 14 T 150 7 T 200 1'
    },
    {
      id: 'anomaly-3',
      platform: 'Instagram Reels',
      platformColor: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
      title: 'The Asymmetric Inbound Pipeline for Solo SaaS Founders',
      author: '@b2b_growth_ops',
      surge: '+340% / MIN',
      surgeMultiplier: '3.4x Spike',
      retentionScore: '87.8% @ 3s',
      sharesPerMin: '76 shares/min',
      saturation: 'Mid Growth (18%)',
      audioHook: '82.5% Audio Velocity',
      sparkline: 'M0 25 Q 35 22, 70 20 T 120 16 T 170 11 T 200 4'
    }
  ];

  return (
    <section className="flex flex-col gap-4">
      {/* Tracker Card Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-sky"></span>
              </span>
              <h2 className="text-sm font-semibold text-white tracking-tight">
                Real-Time Algorithmic Velocity Tracker
              </h2>
            </div>
            <p className="text-xs text-slate-400 pl-4.5 pt-0.5">
              High-frequency social video anomalies detected across global graph APIs.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 font-mono text-[11px] font-bold text-brand-sky">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 animate-spin text-brand-sky">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            </svg>
            <span>STREAMING 124 OPS/S</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Spike Threshold:</span>
            {['>250%', '>300%', '>400%'].map((thr) => (
              <button
                key={thr}
                onClick={() => setFilterThreshold(thr)}
                className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  filterThreshold === thr
                    ? 'bg-brand-blue/20 text-brand-sky border-brand-blue/40 font-semibold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {thr}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {['all', 'tiktok', 'youtube', 'instagram'].map((p) => (
              <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded transition-colors ${
                  activePlatform === p
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Anomaly Stream List */}
      <div className="flex flex-col gap-3">
        {anomalies.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectAnomaly && onSelectAnomaly(item)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer flex flex-col gap-3 group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${item.platformColor}`}>
                    {item.platform}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{item.author}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-brand-sky transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Surge Badge */}
              <div className="flex flex-col items-end">
                <span className="font-mono text-sm font-bold text-emerald-400">
                  {item.surge}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{item.surgeMultiplier}</span>
              </div>
            </div>

            {/* Sparkline & Real-time Graph */}
            <div className="w-full h-8 bg-slate-950 rounded-md border border-slate-800/80 px-2 flex items-center justify-between">
              <svg className="w-36 h-6 overflow-visible" viewBox="0 0 200 30">
                <path d={item.sparkline} fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                <span>{item.retentionScore}</span>
                <span className="text-slate-600">•</span>
                <span>{item.sharesPerMin}</span>
              </div>
            </div>

            {/* Bottom Telemetry Strip */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/50 text-[11px] font-mono text-slate-500">
              <span className="text-brand-sky">{item.saturation}</span>
              <span>{item.audioHook}</span>
              <span className="text-brand-blue group-hover:underline flex items-center gap-1 font-sans text-xs">
                Inspect Script Mutation →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
