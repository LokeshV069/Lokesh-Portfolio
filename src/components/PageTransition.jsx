import React from 'react';

/**
 * PageTransition: Cinematic spatial warp shutter overlay
 * Activates when navigating between sections/pages, giving AAA studio transition feel.
 */
export default function PageTransition({ isTransitioning, targetLabel, targetNum }) {
  if (!isTransitioning) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Shutter Panel */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#08080A]/95 backdrop-blur-3xl border-b border-accent-cyan/60 shadow-[0_10px_40px_rgba(0,240,255,0.35)] animate-shutter-down">
        {/* Subtle grid pattern inside shutter */}
        <div className="absolute inset-0 bg-tech-grid opacity-25" />
      </div>

      {/* Bottom Shutter Panel */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#08080A]/95 backdrop-blur-3xl border-t border-accent-cyan/60 shadow-[0_-10px_40px_rgba(0,240,255,0.35)] animate-shutter-up">
        {/* Subtle grid pattern inside shutter */}
        <div className="absolute inset-0 bg-tech-grid opacity-25" />
      </div>

      {/* Center Cinematic Telemetry HUD */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-3 animate-hud-pulse">
        {/* Diamond Reticle */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0 border border-accent-cyan/40 rotate-45 animate-spin-slow" />
          <div className="w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_15px_#00F0FF]" />
        </div>

        {/* Section Target Details */}
        <div className="space-y-1">
          <div className="font-mono text-[10px] tracking-[0.3em] text-accent-cyan font-bold uppercase">
            // TELEPORT ENGAGED
          </div>
          <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase flex items-center justify-center gap-2">
            <span className="text-neutral-500 font-normal">{targetNum}</span>
            <span>{targetLabel}</span>
          </div>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-neutral-400 uppercase pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>SYNCHRONIZING VIEWPORT COORDINATES</span>
        </div>
      </div>
    </div>
  );
}
