import React from 'react';

export default function TelemetryBar() {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-brand-sky animate-ping"></span>
          <span className="font-mono text-[10px] text-brand-sky uppercase tracking-wider font-semibold">
            Matrix Live Telemetry
          </span>
        </div>

        <div className="hidden sm:block h-3.5 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span>
            LATENCY: <strong className="text-emerald-400">14ms</strong>
          </span>
          <span>
            EDGE NODES: <strong className="text-brand-sky">48/48 ONLINE</strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-emerald-400">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>VELOCITY ENGINE ACTIVE</span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[10px] bg-brand-blue/10 text-brand-sky border border-brand-blue/25 px-2.5 py-1 rounded-md">
          <span>GLOBAL SCRAPE: 99.98%</span>
        </div>
      </div>
    </div>
  );
}
