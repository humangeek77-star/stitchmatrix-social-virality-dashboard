import React from 'react';

export default function Header() {
  return (
    <header className="h-14 bg-[#0D0D10]/95 backdrop-blur-md border-b border-[#1E1E22] fixed top-0 left-64 right-0 z-20 flex items-center justify-between px-6">
      {/* Left: Cluster Telemetry & Active Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#121214] px-3 py-1 rounded-md border border-[#222226] text-[11px] text-zinc-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-3.5 h-3.5 text-zinc-500">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span className="font-mono">cluster://us-east-viral.stitch.matrix:8080</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#121215] px-2.5 py-1 rounded-md border border-[#222226] text-zinc-300 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Live Ingestion Active</span>
        </div>
      </div>

      {/* Right: Sub-Navigation & Quick Actions */}
      <div className="flex items-center gap-3">
        <nav className="hidden lg:flex items-center gap-1 bg-[#141416] p-1 rounded-lg border border-[#222226] text-xs">
          <button className="px-2.5 py-1 rounded bg-[#202024] text-white font-medium">Live Feed</button>
          <button className="px-2.5 py-1 rounded text-zinc-400 hover:text-white transition-colors">High-Frequency</button>
          <button className="px-2.5 py-1 rounded text-zinc-400 hover:text-white transition-colors">Script Studio</button>
          <button className="px-2.5 py-1 rounded text-zinc-400 hover:text-white transition-colors">Cluster Nodes</button>
        </nav>

        <div className="flex items-center gap-2 pl-2 border-l border-[#1E1E22]">
          <button className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B] rounded-md transition-colors" title="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B] rounded-md transition-colors relative" title="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
