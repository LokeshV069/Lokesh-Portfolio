import React from 'react';
import SectionLabel from '../components/SectionLabel';
import XRSpatialVisual from '../three/XRSpatialVisual';
import { Eye, Hand, Move3d, Compass, Layers, Shield } from 'lucide-react';

export default function XRSection() {
  const xrConcepts = [
    { title: 'HAND TRACKING', subtitle: 'Natural skeletal articulation with zero physical controllers', icon: Hand },
    { title: '6DoF FREEDOM', subtitle: 'Full positional & rotational volumetric navigation in space', icon: Move3d },
    { title: 'REAL-TIME RENDERING', subtitle: 'Optimized vertex topology & low-drawcall mobile shaders', icon: Layers },
    { title: 'UNITY ENGINE', subtitle: 'Universal Render Pipeline (URP) & OpenXR interoperability', icon: Compass },
    { title: 'SPATIAL UI', subtitle: 'Distance-adaptive depth affordances & spatial audio feedback', icon: Eye }
  ];

  return (
    <section
      id="xr-spatial"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Spatial Computing and XR Development"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-2">
          <SectionLabel label="// SPATIAL COMPUTING" status="6DoF RUNTIME" accent="lime" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            FROM SCREEN
            <br />
            TO SPACE.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl pt-2">
            Pioneering the transition from flat viewports to volumetric physical reality. Authoring immersive spatial mechanics, hand-tracking interaction models, and augmented physical commerce.
          </p>
        </div>

        {/* Central 3D Visual with Floating Surrounding HUD Cards */}
        <div className="relative rounded-3xl bg-neutral-950/70 border border-white/15 p-6 sm:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[550px]">
          
          {/* Subtle Grid Plane */}
          <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

          {/* Large 3D Monochromatic Crystal Engine */}
          <div className="relative w-full max-w-2xl flex items-center justify-center">
            <XRSpatialVisual />
          </div>

          {/* Floating Spatial Cards Around Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full relative z-20 mt-4">
            {xrConcepts.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 hover:border-white/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-accent-cyan transition-colors">
                      {item.title}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-accent-cyan transition-colors" />
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="w-full mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between font-mono text-[10px] text-neutral-500 gap-2">
            <span>TARGET RUNTIME: OPENXR // META QUEST // VISIONOS // VUFORIA</span>
            <span>COORDINATE DRIFT: 0.000mm // STABLE ANCHOR</span>
          </div>

        </div>

      </div>
    </section>
  );
}
