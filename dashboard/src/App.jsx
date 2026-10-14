import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TelemetryBar from './components/TelemetryBar';
import VelocityMonitor from './components/VelocityMonitor';
import ScriptStudio from './components/ScriptStudio';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area (Offset by sidebar width 256px) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header />

        {/* Page Body */}
        <main className="flex-1 pt-20 pb-12 px-8 flex flex-col gap-6 max-w-7xl w-full mx-auto">
          {/* Top Real-Time Status Telemetry Bar */}
          <TelemetryBar />

          {/* Main 60/40 Split Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 60% Column: Velocity Tracker & Algorithmic Anomaly Feed */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <VelocityMonitor />
            </div>

            {/* Right 40% Column: Script Matrix Studio & Production Terminal */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-20">
              <ScriptStudio />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
