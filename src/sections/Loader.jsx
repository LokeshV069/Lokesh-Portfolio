import React, { useEffect, useState, useCallback } from 'react';
import LoaderScene from '../three/LoaderScene';
import { audioEngine } from '../utils/audioEngine';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL CORE RUNTIME...');
  const [isFading, setIsFading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const finishLoading = useCallback(() => {
    if (isFading) return;
    setIsFading(true);
    audioEngine.playClickChime();
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  }, [isFading, onComplete]);

  useEffect(() => {
    const statuses = [
      { at: 12, text: 'MOUNTING HARDWARE ACCELERATED 3D WEBGL ENGINE...' },
      { at: 35, text: 'CALIBRATING CELESTIAL ORBITAL MATRICES & SHADERS...' },
      { at: 58, text: 'INDEXING CHROMA VECTOR EMBEDDINGS & RAG PIPELINE...' },
      { at: 80, text: 'INITIALIZING 6DOF SPATIAL GESTURES & AUDIO ENGINE...' },
      { at: 96, text: 'SYNCHRONIZING TELEMETRY // SYSTEM NOMINAL' },
      { at: 100, text: 'ALL SYSTEMS ACTIVE // ENTERING SPATIAL PORTFOLIO' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          setTimeout(() => {
            finishLoading();
          }, 900);
          return 100;
        }

        // Smooth gradual pacing (~4 seconds total)
        const increment = Math.random() < 0.3 ? 1 : Math.floor(Math.random() * 2) + 1;
        const next = Math.min(prev + increment, 100);
        const matched = statuses.slice().reverse().find((s) => next >= s.at);
        if (matched) {
          setStatusText(matched.text);
        }
        return next;
      });
    }, 60);

    // Allow user to click or press any key to enter immediately
    const handleKeyDown = () => finishLoading();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishLoading]);

  return (
    <aside
      onClick={finishLoading}
      className={`fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all duration-700 select-none cursor-pointer overflow-hidden ${
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
        <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none" />
      </div>

      {/* 2. Interactive Master-Level 3D Three.js Scene */}
      <LoaderScene progress={progress} />

      {/* 3. Top Architectural HUD Telemetry */}
      <div className="relative z-20 w-full flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 border border-white/15 backdrop-blur-md">
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
          <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 font-bold text-white">
            60 FPS // GPU ACCELERATED
          </span>
        </div>
      </div>

      {/* 4. Center-Bottom Telemetry & Progress Dashboard */}
      <div className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-5 my-auto pb-4">
        {/* Monogram Brand Header */}
        <div className="flex flex-col items-center space-y-2">
          {/* Glowing Minimalist Diamond Icon */}
          <div className="w-10 h-10 rounded-2xl bg-neutral-900/90 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.2)] mb-1">
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
        <div className="w-full space-y-2.5 pt-2">
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

        {/* Fast-forward Hint */}
        <p className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase pt-1">
          {isReady ? 'READY // CLICK TO ENTER' : 'CLICK OR PRESS ANY KEY TO INITIALIZE'}
        </p>
      </div>

      {/* 5. Bottom Architectural Status Bar */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] sm:text-[10px] text-neutral-500 gap-2 border-t border-white/10 pt-4">
        <div className="flex items-center gap-4">
          <span>PIPELINE // THREE.JS 3D RUNTIME</span>
          <span className="text-neutral-700">•</span>
          <span>SPATIAL AUDIO // STANDBY</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          <span>PORTFOLIO SYSTEM OPERATIONAL</span>
        </div>
      </div>
    </aside>
  );
}
