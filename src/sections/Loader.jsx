import React, { useEffect, useState, useCallback } from 'react';
import LoaderScene from '../three/LoaderScene';
import { audioEngine } from '../utils/audioEngine';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL CORE RUNTIME...');
  const [isFading, setIsFading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleExplore = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    audioEngine.playClickChime();
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  }, [isFading, onComplete]);

  // Loading progress counter
  useEffect(() => {
    const statuses = [
      { at: 12, text: 'MOUNTING HARDWARE ACCELERATED 3D WEBGL ENGINE...' },
      { at: 35, text: 'CALIBRATING CELESTIAL ORBITAL MATRICES & SHADERS...' },
      { at: 58, text: 'INDEXING CHROMA VECTOR EMBEDDINGS & RAG PIPELINE...' },
      { at: 80, text: 'INITIALIZING 6DOF SPATIAL GESTURES & AUDIO ENGINE...' },
      { at: 96, text: 'SYNCHRONIZING TELEMETRY // SYSTEM NOMINAL' },
      { at: 100, text: 'SYSTEM ONLINE // ALL SUBSYSTEMS NOMINAL' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          setStatusText('SYSTEM ONLINE // ALL SUBSYSTEMS NOMINAL');
          return 100;
        }

        // Pacing: smooth ~4-second progression
        const increment = Math.random() < 0.3 ? 1 : Math.floor(Math.random() * 2) + 1;
        const next = Math.min(prev + increment, 100);
        const matched = statuses.slice().reverse().find((s) => next >= s.at);
        if (matched) {
          setStatusText(matched.text);
        }
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: Press Enter or Space to Explore once ready
  useEffect(() => {
    if (!isReady) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleExplore();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady, handleExplore]);

  return (
    <aside
      className={`fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all duration-700 select-none overflow-hidden ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="System Initializing"
    >
      {/* 1. Photorealistic Cosmic Horizon & Mountain Backdrop */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('/loader_celestial_bg.jpg')"
          }}
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* 2. Interactive Master-Level 3D Three.js Scene */}
      <LoaderScene progress={progress} />

      {/* 3. Top Architectural HUD Telemetry */}
      <div className="relative z-20 w-full flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 border border-white/15 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
            <span className="text-white font-bold">BOOT // v4.8</span>
          </div>
          <span className="hidden sm:inline text-neutral-500">
            SYSTEM BOOT PROTOCOL
          </span>
        </div>

        <div className="text-right flex items-center gap-4">
          <span className="hidden md:inline text-neutral-500">
            COORDINATES // 11.0168° N, 76.9533° E
          </span>
          <span className="px-2.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-bold text-white">
            60 FPS // GPU ACCELERATED
          </span>
        </div>
      </div>

      {/* 4. Center-Bottom Telemetry & Progress Dashboard */}
      <div className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-4 my-auto pb-4">
        {/* Monogram Brand Header */}
        <div className="flex flex-col items-center space-y-2">
          {/* Glowing Minimalist Diamond Icon */}
          <div className="w-10 h-10 rounded-2xl bg-neutral-900/90 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)] mb-1">
            <svg
              className="w-4 h-4 text-white fill-current animate-pulse"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2L22 12L12 22L2 12Z" />
            </svg>
          </div>

          <h1 className="font-mono text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
            LOKESH V
          </h1>
          <p className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-300 uppercase">
            SPATIAL COMPUTING // AI SYSTEMS // INTERFACE ARCHITECTURE
          </p>
        </div>

        {/* Progress Gauge & Live Subsystem Module Log */}
        <div className="w-full space-y-2.5 pt-1">
          <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
            <span className="tracking-wider truncate max-w-[80%] text-neutral-300 font-medium">
              {statusText}
            </span>
            <span className="font-bold text-white pl-4 font-mono text-sm tracking-widest text-accent-cyan">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>

          {/* Dual Precision Progress Bar */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative backdrop-blur-md">
            <div
              className="h-full bg-white transition-all duration-100 ease-out shadow-[0_0_15px_rgba(255,255,255,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Micro Telemetry Ticks */}
          <div className="flex justify-between items-center w-full px-0.5 opacity-40">
            {[0, 25, 50, 75, 100].map((t) => (
              <span key={t} className="font-mono text-[8px] text-neutral-400">
                |
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Action Area: Progressing vs Ready to Explore */}
        {!isReady ? (
          <div className="pt-2 flex items-center gap-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span>CALIBRATING 3D SPATIAL UNIVERSE...</span>
          </div>
        ) : (
          <div className="pt-3 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-500">
            {/* Master-level Glowing EXPLORE Button */}
            <button
              id="loader-explore-button"
              onClick={handleExplore}
              className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full bg-white text-black font-mono font-black text-xs sm:text-sm tracking-widest uppercase hover:bg-neutral-100 shadow-[0_0_35px_rgba(255,255,255,0.8)] hover:shadow-[0_0_55px_rgba(255,255,255,1.0)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE</span>
              <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg className="w-3 h-3 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
            <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
              CLICK OR PRESS [ENTER] TO ENTER
            </span>
          </div>
        )}
      </div>

      {/* 5. Bottom Architectural Status Bar */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-500 gap-2 border-t border-white/10 pt-4">
        <div className="flex items-center gap-4">
          <span>PIPELINE // THREE.JS 3D RUNTIME</span>
          <span className="text-neutral-700">•</span>
          <span>SPATIAL AUDIO // READY</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          <span>{isReady ? 'READY TO ENTER' : 'LOADING SUBSYSTEMS'}</span>
        </div>
      </div>
    </aside>
  );
}
