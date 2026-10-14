import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'grid', badge: null },
    { id: 'velocity', label: 'Velocity Monitor', icon: 'trending', badge: 'Live', badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    { id: 'pipeline', label: 'AI Script Pipeline', icon: 'cpu', badge: '4 Active', badgeColor: 'bg-zinc-800 text-zinc-400 border border-zinc-700/60' },
    { id: 'accounts', label: 'Connected Channels', icon: 'share', badge: '3 Connected', badgeColor: 'bg-zinc-800 text-zinc-400 border border-zinc-700/60' },
    { id: 'settings', label: 'Settings & API Keys', icon: 'sliders', badge: null },
  ];

  return (
    <aside className="w-64 bg-[#0D0D10] border-r border-[#1E1E22] flex flex-col justify-between h-screen fixed left-0 top-0 z-30 select-none">
      <div className="flex flex-col p-4 gap-6">
        {/* Brand Header */}
        <div className="flex flex-col gap-2.5 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-zinc-100 font-semibold text-xs shadow-sm">
                SM
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight text-zinc-100">
                  StitchMatrix
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#141416] border border-[#222226]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-zinc-400 font-medium">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#1E1E22]">
            <span className="text-[11px] text-zinc-500">Engine Version</span>
            <span className="text-[11px] font-mono text-zinc-400 bg-[#161619] px-1.5 py-0.5 rounded border border-[#222226]">
              v2.4
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#202024] text-white font-semibold shadow-sm border border-[#2B2B30]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 flex items-center justify-center text-zinc-400">
                    {item.icon === 'grid' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                      </svg>
                    )}
                    {item.icon === 'trending' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    )}
                    {item.icon === 'cpu' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                        <line x1="9" y1="1" x2="9" y2="4"></line>
                        <line x1="15" y1="1" x2="15" y2="4"></line>
                        <line x1="9" y1="20" x2="9" y2="23"></line>
                        <line x1="15" y1="20" x2="15" y2="23"></line>
                      </svg>
                    )}
                    {item.icon === 'share' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    )}
                    {item.icon === 'sliders' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <line x1="4" y1="21" x2="4" y2="14"></line>
                        <line x1="4" y1="10" x2="4" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="3"></line>
                        <line x1="20" y1="21" x2="20" y2="16"></line>
                        <line x1="20" y1="12" x2="20" y2="3"></line>
                      </svg>
                    )}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile & Account Tier Card */}
      <div className="p-4 border-t border-[#1E1E22]">
        <div className="p-3 rounded-lg bg-[#121214] border border-[#222226] flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#1E1E22] border border-[#2B2B30] flex items-center justify-center font-medium text-xs text-zinc-200">
              AR
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium text-zinc-200 truncate">Alex Rivera</span>
              <span className="text-[11px] text-zinc-500 truncate">Lead Growth Engineer</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#1E1E22]">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181B] text-zinc-300 border border-[#27272A] font-medium">
              Enterprise Suite
            </span>
            <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-3.5 h-3.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
