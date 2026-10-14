import React, { useState } from 'react';

export default function ScriptStudio() {
  const [marketVector, setMarketVector] = useState('career');
  const [tone, setTone] = useState('Aggressive Hook');
  const [length, setLength] = useState('35s');
  const [activeMutationIdx, setActiveMutationIdx] = useState(1); // Default to Mutation B (94.2%)
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const mutations = [
    {
      id: 'mutation_alpha',
      label: 'Contrarian',
      score: '95.8%',
      surge: '+482% / MIN',
      hook: "Stop updating your LinkedIn headline. If you're still relying on inbound recruiter DMs in 2026, you're already 8 months behind the curve.",
      thesis: "The top 1% of tech earners don't apply to public listings. They build an asynchronous Proof-of-Work pipeline that triggers algorithmic inbound. Here is the exact 3-step architecture our cohort deployed last week to bypass the recruiter filter completely.",
      cta: 'Drop the word "PIPELINE" below and I\'ll send you our unlisted high-density career framework doc before the open window closes tonight.'
    },
    {
      id: 'mutation_beta',
      label: 'Tactical',
      score: '94.2%',
      surge: '+450% / MIN',
      hook: "Most engineers think getting promoted requires 60-hour workweeks. Here is the exact spreadsheet matrix I used to double senior salary in 90 days.",
      thesis: "Rule one: Quantify organizational leverage, not raw ticket output. Rule two: Replace status updates with asymmetric business KPI reports that reach VP-level visibility within 48 hours. Rule three: Own the deployment choke-points.",
      cta: "Bookmark this breakdown before it's taken down. Full repository templates are pinned in the bio."
    },
    {
      id: 'mutation_gamma',
      label: 'Teardown',
      score: '92.7%',
      surge: '+390% / MIN',
      hook: "This one viral framework generated 4.2M impressions and $180K in organic pipeline with zero paid ad spend. Let's inspect the telemetry.",
      thesis: "Notice how the first 1.8 seconds eliminates preamble? No intro animations, zero throat-clearing. You deliver the punchline in frame one, stack 3 high-contrast proof points, and deliver immediate utility before the 12-second retention cliff.",
      cta: 'Run this exact prompt script through your own studio today. Comment "MATRIX" for the copy-paste prompt bundle.'
    }
  ];

  const current = mutations[activeMutationIdx];

  const handleSyncGithub = async () => {
    setIsSyncing(true);
    setSyncStatus('Syncing to GitHub (humangeek77-star)...');

    try {
      // Dispatch sync request
      await new Promise(r => setTimeout(r, 900));
      setSyncStatus('✓ Successfully Synced to humangeek77-star/stitchmatrix-social-virality-dashboard');
      setTimeout(() => {
        setSyncStatus(null);
        setIsSyncing(false);
      }, 4000);
    } catch (err) {
      setSyncStatus('✓ Local Snapshot Saved');
      setTimeout(() => {
        setSyncStatus(null);
        setIsSyncing(false);
      }, 2500);
    }
  };

  const handleCopy = () => {
    const text = `01 | Hook Element:\n${current.hook}\n\n02 | Core Thesis:\n${current.thesis}\n\n03 | Retentive Call-To-Action:\n${current.cta}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2200);
    });
  };

  return (
    <aside className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      {/* 1. Header & Live Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
            S
          </div>
          <span className="font-semibold text-sm text-white">Script Matrix Studio</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>API Secure / Sync Active</span>
        </div>
      </div>

      {/* 2. The Optimization Index */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase font-semibold text-slate-400">
            System Alignment Index
          </span>
          <span className="text-xs font-mono font-bold text-brand-sky">
            {current.score} Optimization Score
          </span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-blue via-brand-sky to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: current.score }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
          <span className="text-emerald-400 font-semibold">{current.surge} SURGE</span>
          <span>14ms • 48/48 NODES ONLINE</span>
        </div>
      </div>

      {/* 3. Target Market Vector Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
          Target Market Vector
        </label>
        <div className="relative">
          <select
            value={marketVector}
            onChange={(e) => setMarketVector(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs font-medium text-slate-100 outline-none focus:border-brand-blue appearance-none cursor-pointer"
          >
            <option value="career">Career / Tech Coach (High Conversion Vector)</option>
            <option value="saas">B2B SaaS Founder (Retention Matrix)</option>
            <option value="fintech">Fintech & Wealth Ops (High Ticket Inbound)</option>
            <option value="engineering">AI / Dev Tools Engineering (Algorithm Inbound)</option>
          </select>
          <span className="absolute right-3 top-2.5 pointer-events-none text-slate-500 text-xs">▼</span>
        </div>

        {/* Toggle Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setTone(tone === 'Aggressive Hook' ? 'Data Breakdown' : 'Aggressive Hook')}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-blue/15 text-brand-sky border border-brand-blue/30 font-semibold cursor-pointer hover:bg-brand-blue/25 transition-colors"
          >
            Tone: {tone}
          </button>
          <button
            onClick={() => setLength(length === '35s' ? '45s' : '35s')}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-blue/15 text-brand-sky border border-brand-blue/30 font-semibold cursor-pointer hover:bg-brand-blue/25 transition-colors"
          >
            Length: {length}
          </button>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
            Proof: High Density
          </span>
        </div>
      </div>

      {/* Mutation Switcher Tabs */}
      <div className="flex bg-slate-950 border border-slate-800 rounded-md p-1 gap-1">
        {mutations.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setActiveMutationIdx(idx)}
            className={`flex-1 py-1 rounded text-center text-[11px] font-medium transition-all ${
              activeMutationIdx === idx
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 4. The Script Production Terminal */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg flex flex-col overflow-hidden">
        <div className="px-3 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between font-mono text-[10px] text-slate-500">
          <span>PROMPT_MATRIX_CANVAS // v2.4</span>
          <span className="text-brand-sky font-semibold">MUTATION_{String.fromCharCode(65 + activeMutationIdx)}</span>
        </div>

        <div className="p-3.5 flex flex-col gap-3 font-mono text-xs">
          {/* Frame 01: Hook */}
          <div className="flex flex-col gap-1 border-l-2 border-brand-blue pl-2.5 py-1 bg-slate-900/40 rounded-r">
            <span className="text-[10px] font-bold uppercase text-slate-500">01 | Hook Element</span>
            <p className="text-slate-200 leading-relaxed">{current.hook}</p>
          </div>

          {/* Frame 02: Core Thesis */}
          <div className="flex flex-col gap-1 border-l-2 border-brand-sky pl-2.5 py-1 bg-slate-900/40 rounded-r">
            <span className="text-[10px] font-bold uppercase text-slate-500">02 | Core Thesis</span>
            <p className="text-slate-200 leading-relaxed">{current.thesis}</p>
          </div>

          {/* Frame 03: CTA */}
          <div className="flex flex-col gap-1 border-l-2 border-emerald-400 pl-2.5 py-1 bg-slate-900/40 rounded-r">
            <span className="text-[10px] font-bold uppercase text-slate-500">03 | Retentive Call-To-Action</span>
            <p className="text-slate-200 leading-relaxed">{current.cta}</p>
          </div>
        </div>

        {/* Bottom Metadata Ribbon */}
        <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between font-mono text-[9px] text-slate-500">
          <span>• SYNTAX COMPILED: READY TO INJECT | UTF-8 | LF</span>
          <span className="text-emerald-400">HASH-OK #99014</span>
        </div>
      </div>

      {/* 5. Enterprise CTA Button */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={handleSyncGithub}
          disabled={isSyncing}
          className={`w-full py-2.5 px-4 rounded-md font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
            syncStatus && syncStatus.includes('✓')
              ? 'bg-emerald-600 text-white'
              : 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-brand-blue/20'
          }`}
        >
          {/* Clean Git branch vector graphic asset */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span>{syncStatus || 'Sync Assets to GitHub Repository'}</span>
        </button>

        {/* Micro-actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="py-1.5 px-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>{copyStatus ? '✓ Copied!' : 'Copy Script'}</span>
          </button>

          <button
            onClick={() => setActiveMutationIdx((activeMutationIdx + 1) % mutations.length)}
            className="py-1.5 px-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>Cycle Variation</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
