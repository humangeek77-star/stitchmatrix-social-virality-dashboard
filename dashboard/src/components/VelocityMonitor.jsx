import React, { useState } from 'react';

export default function VelocityMonitor({ onSelectAnomaly }) {
  const [filterThreshold, setFilterThreshold] = useState('>300%');
  const [activePlatform, setActivePlatform] = useState('all');

  const anomalies = [
    {
      id: 'anomaly-1',
      platform: 'TikTok',
      platformColor: 'text-zinc-300 border-[#27272A] bg-[#18181B]',
      title: 'Enterprise Salary Negotiation Proof-of-Work Matrix',
      author: '@growth_lead_tech',
      surge: '+482% / min',
      surgeMultiplier: '4.8x spike',
      retentionScore: '91.2% @ 3s',
      sharesPerMin: '128 shares/min',
      saturation: 'Early Curve (< 12%)',
      audioHook: '94.0% Audio Retention',
      sparkline: 'M0 24 Q 25 21, 50 18 T 100 13 T 150 7 T 200 2'
    },
    {
      id: 'anomaly-2',
      platform: 'YouTube Shorts',
      platformColor: 'text-zinc-300 border-[#27272A] bg-[#18181B]',
      title: 'Why 99% of Devs Fail Principal Level System Design',
      author: '@arch_patterns_hq',
      surge: '+520% / min',
      surgeMultiplier: '5.2x spike',
      retentionScore: '93.5% @ 3s',
      sharesPerMin: '184 shares/min',
      saturation: 'Early Curve (< 9%)',
      audioHook: '88.2% Audio Retention',
      sparkline: 'M0 22 Q 30 20, 60 16 T 120 11 T 160 5 T 200 1'
    },
    {
      id: 'anomaly-3',
      platform: 'Instagram Reels',
      platformColor: 'text-zinc-300 border-[#27272A] bg-[#18181B]',
      title: 'The Asymmetric Inbound Pipeline for Solo SaaS Founders',
      author: '@b2b_growth_ops',
      surge: '+340% / min',
      surgeMultiplier: '3.4x spike',
      retentionScore: '87.8% @ 3s',
      sharesPerMin: '76 shares/min',
      saturation: 'Mid Growth (18%)',
      audioHook: '82.5% Audio Retention',
      sparkline: 'M0 23 Q 35 21, 75 18 T 130 14 T 170 9 T 200 4'
    }
  ];

  return (
    <section className="flex flex-col gap-4">
      {/* Tracker Card Container */}
      <div className="bg-[#121214] border border-[#1E1E22] rounded-xl p-5 flex flex-col gap-4 shadow-sm">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <h2 className="text-sm font-semibold text-zinc-100 tracking-tight">
                Algorithmic Velocity Tracker
              </h2>
            </div>
            <p className="text-xs text-zinc-400 pl-4">
              Real-time high-velocity anomalies identified across social platform graphs.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#18181B] px-3 py-1 rounded-md border border-[#27272A] text-[11px] font-medium text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>124 ops/s stream</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1E1E22]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Spike Threshold:</span>
            {['>250%', '>300%', '>400%'].map((thr) => (
              <button
                key={thr}
                onClick={() => setFilterThreshold(thr)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                  filterThreshold === thr
                    ? 'bg-[#202024] text-white border-[#3F3F46] font-medium'
                    : 'bg-[#18181B] text-zinc-400 border-[#27272A] hover:text-white'
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
                className={`text-[11px] capitalize px-2.5 py-0.5 rounded transition-colors ${
                  activePlatform === p
                    ? 'bg-[#202024] text-white font-medium border border-[#2B2B30]'
                    : 'text-zinc-500 hover:text-zinc-300'
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
            className="bg-[#121214] border border-[#1E1E22] hover:border-[#27272A] hover:bg-[#151518] rounded-xl p-4 transition-all hover:shadow-md cursor-pointer flex flex-col gap-3 group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10.5px] px-2 py-0.5 rounded border font-medium ${item.platformColor}`}>
                    {item.platform}
                  </span>
                  <span className="text-xs text-zinc-500">{item.author}</span>
                </div>
                <h3 className="text-[13.5px] font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Surge Badge */}
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-emerald-400">
                  {item.surge}
                </span>
                <span className="text-[10.5px] text-zinc-500">{item.surgeMultiplier}</span>
              </div>
            </div>

            {/* Sparkline & Real-time Graph */}
            <div className="w-full h-8 bg-[#18181B] rounded-md border border-[#222226] px-3 flex items-center justify-between">
              <svg className="w-36 h-5 overflow-visible" viewBox="0 0 200 30">
                <path d={item.sparkline} fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                <span>{item.retentionScore}</span>
                <span className="text-zinc-600">·</span>
                <span>{item.sharesPerMin}</span>
              </div>
            </div>

            {/* Bottom Telemetry Strip */}
            <div className="flex items-center justify-between pt-1 border-t border-[#1C1C1F] text-[11.5px] text-zinc-500">
              <span className="text-zinc-400">{item.saturation}</span>
              <span>{item.audioHook}</span>
              <span className="text-blue-400 group-hover:text-blue-300 flex items-center gap-1 text-xs font-medium">
                Open in Script Studio →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
