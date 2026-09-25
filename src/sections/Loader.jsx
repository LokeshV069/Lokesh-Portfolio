import React, { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL SYSTEM');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'CALIBRATING SPATIAL RUNTIME...' },
      { at: 40, text: 'MOUNTING NEURAL CONTEXTS & RAG EMBEDDINGS...' },
      { at: 68, text: 'INITIALIZING WEBGL 3D PIPELINE...' },
      { at: 88, text: 'SYNCHRONIZING INTERFACE TELEMETRY...' },
      { at: 100, text: 'SYSTEM READY // ALL SUBSYSTEMS NOMINAL' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 350);
          return 100;
        }

        const next = Math.min(prev + Math.floor(Math.random() * 8) + 3, 100);
        const matched = statuses.slice().reverse().find((s) => next >= s.at);
        if (matched) {
          setStatusText(matched.text);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-8 sm:p-12 transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="System Initializing"
    >
      {/* Top HUD info */}
      <div className="w-full flex items-center justify-between font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
        <span>SYS.BOOT // v2.6.4</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span>PORTFOLIO_LOKESH</span>
        </span>
      </div>

      {/* Center Branding & Progress */}
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 border border-white/20 mb-2">
            <span className="font-mono text-xl font-black text-white">L</span>
          </div>
          <h1 className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-white">
            LOKESH V
          </h1>
          <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
            SOFTWARE DEVELOPER // DESIGNER
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
            <span className="tracking-widest truncate">{statusText}</span>
            <span className="font-bold text-white pl-4">{String(progress).padStart(2, '0')}%</span>
          </div>

          <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-white transition-all duration-75 ease-out shadow-glow-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Technical Telemetry */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-neutral-600 gap-2">
        <span>COORDINATES: 11.0168° N, 76.9558° E [COIMBATORE]</span>
        <span className="hidden sm:inline">RENDER PIPELINE: HARDWARE ACCELERATED</span>
        <span>SECURITY: VERIFIED IDENTITY</span>
      </div>
    </div>
  );
}
