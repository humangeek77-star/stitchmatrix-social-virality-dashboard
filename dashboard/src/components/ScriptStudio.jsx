import React, { useState } from 'react';

export default function ScriptStudio() {
  const [marketVector, setMarketVector] = useState('career');
  const [tone, setTone] = useState('Direct Hook');
  const [length, setLength] = useState('35s');
  const [activeMutationIdx, setActiveMutationIdx] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const scriptDatabase = {
    career: [
      {
        id: 'c_contrarian',
        label: 'Contrarian',
        score: '95.8%',
        surge: '+482% surge',
        duration: '32s',
        hook: "Stop updating your LinkedIn headline. If you're still relying on inbound recruiter DMs in 2026, you're already 8 months behind the curve.",
        thesis: "The top 1% of tech earners don't apply to public listings. They build an asynchronous Proof-of-Work pipeline that triggers algorithmic inbound. Here is the exact 3-step architecture our cohort deployed last week to bypass the recruiter filter completely.",
        cta: 'Drop the word "PIPELINE" below and I\'ll send you our unlisted high-density career framework doc before the open window closes tonight.'
      },
      {
        id: 'c_tactical',
        label: 'Tactical',
        score: '94.2%',
        surge: '+450% surge',
        duration: '35s',
        hook: "Most engineers think getting promoted requires 60-hour workweeks. Here is the exact spreadsheet matrix I used to double senior salary in 90 days.",
        thesis: "Rule one: Quantify organizational leverage, not raw ticket output. Rule two: Replace status updates with asymmetric business KPI reports that reach VP-level visibility within 48 hours. Rule three: Own the deployment choke-points.",
        cta: "Bookmark this breakdown before it's taken down. Full repository templates are pinned in the bio."
      },
      {
        id: 'c_teardown',
        label: 'Teardown',
        score: '92.7%',
        surge: '+390% surge',
        duration: '28s',
        hook: "This one viral framework generated 4.2M impressions and $180K in organic pipeline with zero paid ad spend. Let's inspect the telemetry.",
        thesis: "Notice how the first 1.8 seconds eliminates preamble? No intro animations, zero throat-clearing. You deliver the punchline in frame one, stack 3 high-contrast proof points, and deliver immediate utility before the 12-second retention cliff.",
        cta: 'Run this exact prompt script through your own studio today. Comment "MATRIX" for the copy-paste prompt bundle.'
      }
    ],
    saas: [
      {
        id: 's_contrarian',
        label: 'Contrarian',
        score: '96.4%',
        surge: '+510% surge',
        duration: '34s',
        hook: "Your SaaS landing page isn't losing conversions because of your copy. It's leaking churn because you're pricing features instead of leverage.",
        thesis: "When you tier users by seats, you penalize team adoption. When you tier users by programmatic throughput metrics, usage scales automatically with customer ARR. Here is how we flipped our billing model in 48 hours.",
        cta: 'Comment "PRICING" and I will DM you the open-source monetization architecture.'
      },
      {
        id: 's_tactical',
        label: 'Tactical',
        score: '93.9%',
        surge: '+430% surge',
        duration: '36s',
        hook: "Zero to $100K MRR in 6 months without cold email or paid ads. Here is the exact organic distribution flywheel we engineered.",
        thesis: "Step one: Scrape viral industry anomalies every 4 hours. Step two: Repackage the data into high-contrast single-chart teardowns. Step three: Embed an interactive calculator link directly in the top pinned reply.",
        cta: "Save this post. The Notion template and automation scripts are in the bio link."
      },
      {
        id: 's_teardown',
        label: 'Teardown',
        score: '91.5%',
        surge: '+380% surge',
        duration: '30s',
        hook: "Here is why 90% of AI wrappers will be dead by Q4, and the 1 architectural moat that survives.",
        thesis: "API wrappers compete on latency and cost margins to zero. Proprietary distribution layers that ingest and own user workflow state cannot be commoditized by base LLM releases.",
        cta: 'Drop "MOAT" below to get the full enterprise retention audit checklist.'
      }
    ],
    fintech: [
      {
        id: 'f_contrarian',
        label: 'Contrarian',
        score: '95.1%',
        surge: '+470% surge',
        duration: '33s',
        hook: "Stop locking your capital in generic index funds if your net worth is under $250K. Here is why high-earners pivot.",
        thesis: "The math is simple: a 7% return on $50K is $3,500 a year. That won't buy your freedom. Reinvesting that same $50K into high-leverage distribution infrastructure yields 10x-50x enterprise equity in 24 months.",
        cta: 'Comment "ALLOCATION" for our private wealth velocity spreadsheet.'
      },
      {
        id: 'f_tactical',
        label: 'Tactical',
        score: '94.6%',
        surge: '+460% surge',
        duration: '35s',
        hook: "The 3 tax loopholes top tech executives use before exercising pre-IPO options in 2026.",
        thesis: "First: Section 1202 QSBS exclusion. Second: 83(b) timely election within 30 days of grant. Third: Donor-advised fund transfers to offset short-term capital gains at peak valuation.",
        cta: 'Bookmark this guide. Pinned link has our estate attorney vetting sheet.'
      },
      {
        id: 'f_teardown',
        label: 'Teardown',
        score: '93.2%',
        surge: '+410% surge',
        duration: '29s',
        hook: "We audited 40 high-net-worth portfolios this quarter. Here is the #1 mistake costing operators six figures.",
        thesis: "They leave cash in low-yield operational accounts instead of treasury sweep accounts generating risk-free 5.2% daily liquidity yield.",
        cta: 'Comment "TREASURY" to receive our cash management SOP.'
      }
    ]
  };

  const currentList = scriptDatabase[marketVector] || scriptDatabase.career;
  const current = currentList[activeMutationIdx] || currentList[0];

  const handleSyncGithub = async () => {
    setIsSyncing(true);
    setSyncStatus('Syncing to GitHub...');

    try {
      await new Promise(r => setTimeout(r, 800));
      setSyncStatus('✓ Synced to GitHub');
      setTimeout(() => {
        setSyncStatus(null);
        setIsSyncing(false);
      }, 3000);
    } catch (err) {
      setSyncStatus('✓ Saved Locally');
      setTimeout(() => {
        setSyncStatus(null);
        setIsSyncing(false);
      }, 2000);
    }
  };

  const handleCopy = () => {
    const text = `01 | Hook Element:\n${current.hook}\n\n02 | Core Thesis:\n${current.thesis}\n\n03 | Retentive Call-To-Action:\n${current.cta}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  return (
    <aside className="bg-[#121214] border border-[#1E1E22] rounded-xl p-5 flex flex-col gap-4 shadow-sm">
      {/* 1. Header & Live Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E1E22]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-[#18181B] border border-[#27272A] flex items-center justify-center text-zinc-200 font-semibold text-xs">
            S
          </div>
          <span className="font-semibold text-sm text-zinc-100">Script Matrix Studio</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded-full text-[11px] font-medium text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Live Sync</span>
        </div>
      </div>

      {/* 2. The Optimization Index */}
      <div className="bg-[#18181B] border border-[#222226] rounded-lg p-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-zinc-400">
            System Alignment
          </span>
          <span className="text-[13px] font-semibold text-zinc-100">
            {current.score} Score
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#27272A] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: current.score }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-0.5">
          <span className="text-emerald-400 font-medium">{current.surge}</span>
          <span>14ms · 48 nodes active</span>
        </div>
      </div>

      {/* 3. Target Market Vector Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] text-zinc-400 font-medium">
          Target Market Vector
        </label>
        <div className="relative">
          <select
            value={marketVector}
            onChange={(e) => {
              setMarketVector(e.target.value);
              setActiveMutationIdx(0);
            }}
            className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-xs font-medium text-zinc-200 outline-none focus:border-blue-500 appearance-none cursor-pointer hover:bg-[#1C1C20] transition-colors"
          >
            <option value="career">Career & Tech Leadership (High Conversion)</option>
            <option value="saas">B2B SaaS Founder (Retention Matrix)</option>
            <option value="fintech">Fintech & Wealth Advisory (High Ticket)</option>
          </select>
          <span className="absolute right-3 top-2.5 pointer-events-none text-zinc-500 text-[10px]">▼</span>
        </div>

        {/* Toggle Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setTone(tone === 'Direct Hook' ? 'Data Breakdown' : 'Direct Hook')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#1E2433] text-blue-300 border border-[#2E4C7E] font-medium cursor-pointer hover:bg-[#25324D] transition-colors"
          >
            Tone: {tone}
          </button>
          <button
            onClick={() => setLength(length === '35s' ? '45s' : '35s')}
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#1E2433] text-blue-300 border border-[#2E4C7E] font-medium cursor-pointer hover:bg-[#25324D] transition-colors"
          >
            Length: {length}
          </button>
          <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#18181B] text-zinc-400 border border-[#27272A]">
            Proof: High Density
          </span>
        </div>
      </div>

      {/* Mutation Switcher Tabs */}
      <div className="flex bg-[#141416] border border-[#222226] rounded-lg p-1 gap-1">
        {currentList.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setActiveMutationIdx(idx)}
            className={`flex-1 py-1.5 rounded-md text-center text-xs font-medium transition-all ${
              activeMutationIdx === idx
                ? 'bg-[#202024] text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 4. The Script Production Terminal */}
      <div className="bg-[#121214] border border-[#1E1E22] rounded-lg flex flex-col overflow-hidden">
        <div className="px-3.5 py-2.5 bg-[#151518] border-b border-[#1E1E22] flex items-center justify-between text-xs text-zinc-400 font-medium">
          <span>Script Canvas (Editable)</span>
          <span className="text-blue-400">Mutation {String.fromCharCode(65 + activeMutationIdx)} · ~{current.duration}</span>
        </div>

        <div className="p-3.5 flex flex-col gap-3 text-xs">
          {/* Frame 01: Hook */}
          <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-3 py-1 bg-[#161619] rounded-r border border-[#222226] border-l-0">
            <span className="text-[10.5px] font-semibold text-zinc-400">01. Hook Element</span>
            <p className="text-zinc-200 font-mono text-[11.5px] leading-relaxed outline-none" contentEditable spellCheck={false}>{current.hook}</p>
          </div>

          {/* Frame 02: Core Thesis */}
          <div className="flex flex-col gap-1 border-l-2 border-blue-400 pl-3 py-1 bg-[#161619] rounded-r border border-[#222226] border-l-0">
            <span className="text-[10.5px] font-semibold text-zinc-400">02. Core Thesis</span>
            <p className="text-zinc-200 font-mono text-[11.5px] leading-relaxed outline-none" contentEditable spellCheck={false}>{current.thesis}</p>
          </div>

          {/* Frame 03: CTA */}
          <div className="flex flex-col gap-1 border-l-2 border-emerald-400 pl-3 py-1 bg-[#161619] rounded-r border border-[#222226] border-l-0">
            <span className="text-[10.5px] font-semibold text-zinc-400">03. Call-to-Action</span>
            <p className="text-zinc-200 font-mono text-[11.5px] leading-relaxed outline-none" contentEditable spellCheck={false}>{current.cta}</p>
          </div>
        </div>

        {/* Bottom Metadata Ribbon */}
        <div className="px-3.5 py-2 bg-[#0E0E10] border-t border-[#1C1C1F] flex items-center justify-between text-[11px] text-zinc-500">
          <span>Syntax compiled · UTF-8</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Verified #99014
          </span>
        </div>
      </div>

      {/* 5. Enterprise CTA Button */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={handleSyncGithub}
          disabled={isSyncing}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
            syncStatus && syncStatus.includes('✓')
              ? 'bg-emerald-600 text-white'
              : 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-brand-blue/20'
          }`}
        >
          {/* Clean Git branch vector graphic asset */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span>{syncStatus || 'Sync Assets to GitHub'}</span>
        </button>

        {/* Micro-actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="py-1.5 px-2 rounded-lg bg-[#18181B] hover:bg-[#202024] border border-[#27272A] text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>{copyStatus ? '✓ Copied' : 'Copy Script'}</span>
          </button>

          <button
            onClick={() => setActiveMutationIdx((activeMutationIdx + 1) % currentList.length)}
            className="py-1.5 px-2 rounded-lg bg-[#18181B] hover:bg-[#202024] border border-[#27272A] text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
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
