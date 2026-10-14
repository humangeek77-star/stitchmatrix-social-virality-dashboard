import React from 'react';

export default function TelemetryBar() {
  return (
    <div className="w-full bg-[#121214] border border-[#1E1E22] rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#18181B] px-2.5 py-1 rounded-md border border-[#27272A]">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-[11px] text-zinc-300 font-medium">
            Live Telemetry
          </span>
        </div>

        <div className="hidden sm:block h-3.5 w-px bg-[#27272A]"></div>

        <div className="flex items-center gap-3 text-[12px] text-zinc-400">
          <span>
            Latency: <strong className="text-zinc-200 font-medium">14ms</strong>
          </span>
          <span>
            Edge Nodes: <strong className="text-zinc-200 font-medium">48/48 Online</strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px] bg-[#18181B] px-2.5 py-1 rounded-md border border-[#27272A] text-zinc-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-3.5 h-3.5 text-emerald-400">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Velocity Engine Active</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] bg-[#161619] text-zinc-400 border border-[#222226] px-2.5 py-1 rounded-md">
          <span>Global Ingestion: 99.98%</span>
        </div>
      </div>
    </div>
  );
}
