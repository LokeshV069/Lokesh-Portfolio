import React, { useEffect, useState, useCallback } from 'react';
import LoaderScene from '../three/LoaderScene';
import { audioEngine } from '../utils/audioEngine';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
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
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }

        // Pacing: smooth ~4-second progression
        const increment = Math.random() < 0.3 ? 1 : Math.floor(Math.random() * 2) + 1;
        const next = Math.min(prev + increment, 100);
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
      className={`fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all duration-700 select-none overflow-hidden ${isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
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

      {/* 4. Center Brand & Circular Progress Loader */}
      <div className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center text-center space-y-6 my-auto pb-6">
        {/* Name — Clean & Minimalist */}
        <h1 className="font-mono text-3xl sm:text-5xl font-black tracking-widest text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.35)] uppercase">
          LOKESH V
        </h1>

        {/* Circular Progress Gauge */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center my-2">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(0,240,255,0.18) 50%, transparent 70%)'
            }}
          />

          {/* SVG Circular Progress Ring */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Outer subtle orbital dashed ring */}
            <circle
              cx="60"
              cy="60"
              r="55"
              className="text-white/10 stroke-current"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="transparent"
            />

            {/* Background Track Circle */}
            <circle
              cx="60"
              cy="60"
              r="48"
              className="text-white/15 stroke-current"
              strokeWidth="3.5"
              fill="transparent"
            />

            {/* Active Animated Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r="48"
              className="text-white stroke-current transition-all duration-100 ease-out"
              strokeWidth="3.5"
              strokeDasharray={2 * Math.PI * 48}
              strokeDashoffset={2 * Math.PI * 48 - (progress / 100) * (2 * Math.PI * 48)}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))'
              }}
            />
          </svg>

          {/* Center Content: Live Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-wider">
              {progress}
              <span className="text-xs sm:text-sm font-normal text-neutral-400 font-mono">%</span>
            </span>
          </div>
        </div>

        {/* Dynamic Action Area: EXPLORE Button once 100% Ready */}
        {isReady && (
          <div className="pt-2 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-500">
            {/* Master-level Glowing EXPLORE Button */}
            <button
              id="loader-explore-button"
              onClick={handleExplore}
              className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full bg-white text-black font-mono font-black text-xs sm:text-sm tracking-widest uppercase hover:bg-neutral-100 shadow-[0_0_35px_rgba(255,255,255,0.85)] hover:shadow-[0_0_55px_rgba(255,255,255,1.0)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
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
