import React from 'react';
import { Code, Clock } from 'lucide-react';
import AboutObjectsScene from '../three/AboutObjectsScene';
import AboutIcosahedron from '../three/AboutIcosahedron';
import AboutSparkle from '../three/AboutSparkle';

export default function About() {
  return (
    <section
      id="about"
      className="w-full relative overflow-hidden border-t border-white/10 select-text"
      aria-label="About Lokesh V"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[920px]">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Architectural Off-White Background (#F4F4F6) */}
        {/* ========================================================= */}
        <div className="relative bg-[#F4F4F6] text-neutral-900 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-black/10">
          
          {/* 3D Floating Faceted Polyhedron on the Left Margin */}
          <div 
            className="absolute -left-6 sm:-left-8 md:-left-12 top-[34%] -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 pointer-events-none z-20"
            aria-hidden="true"
          >
            <AboutIcosahedron />
          </div>

          {/* Top Header & Philosophy Block */}
          <div className="relative z-10 space-y-6">
            {/* Profile Meta Label */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                // PROFILE
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 uppercase leading-none">
              ABOUT ME
            </h2>

            {/* Design Philosophy Subhead */}
            <div className="pt-6 sm:pt-8 space-y-3">
              <p className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                // DESIGN PHILOSOPHY
              </p>

              {/* Bold Impact Statement */}
              <h3 className="text-3xl sm:text-4xl md:text-[2.6rem] xl:text-[3.1rem] font-black tracking-tighter text-neutral-950 uppercase leading-[1.04]">
                I BUILD SYSTEMS
                <br />
                THAT PEOPLE
                <br />
                CAN EXPERIENCE.
              </h3>

              {/* Monospace Sub-description */}
              <p className="font-mono text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md pt-2">
                Transforming abstract algorithms into tangible spatial interfaces and intelligent contextual workflows.
              </p>
            </div>
          </div>

          {/* Dedicated Three.js 3D Objects Showcase: Isometric Cube & Torus */}
          <div className="relative w-full h-56 sm:h-64 md:h-72 my-6 sm:my-8 z-10 flex items-center justify-center">
            <AboutObjectsScene />
          </div>

          {/* Bottom Two White/Gray Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-2">
            
            {/* Card 1: DISCIPLINE */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EAEAEB]/90 hover:bg-[#E2E2E4] border border-black/10 transition-all shadow-sm space-y-2 group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
                  DISCIPLINE
                </span>
                <Code className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black transition-colors" />
              </div>
              <div className="font-sans text-sm sm:text-base font-bold text-neutral-900">
                Software Engineering
              </div>
            </div>

            {/* Card 2: SPECIALIZATION */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EAEAEB]/90 hover:bg-[#E2E2E4] border border-black/10 transition-all shadow-sm space-y-2 group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
                  SPECIALIZATION
                </span>
                <Clock className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black transition-colors" />
              </div>
              <div className="font-sans text-sm sm:text-base font-bold text-neutral-900">
                XR / AI / Interactive Systems
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Pure Black Background (#000000)             */}
        {/* ========================================================= */}
        <div className="relative bg-black text-white px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-between overflow-hidden">
          
          {/* Floating 3D Sparkle / Metallic Star in Lower-Right */}
          <div 
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none z-0 opacity-80"
            aria-hidden="true"
          >
            <AboutSparkle />
          </div>

          {/* Bio Narrative & Academic Foundation */}
          <div className="relative z-10 space-y-8 max-w-xl">
            
            {/* Narrative Paragraphs */}
            <div className="space-y-5 text-sm sm:text-[15px] lg:text-base text-neutral-300 leading-relaxed font-sans">
              <p>
                I am a <strong className="text-white font-semibold">Computer Science and Design</strong> engineer focused on building interactive experiences across XR, AI, automation and modern web technologies.
              </p>
              <p className="text-neutral-400">
                I enjoy combining rigorous engineering, human-centered visual design, and emerging technologies to create software systems, that are both computationally robust and immediately engaging.
              </p>
              <p className="text-neutral-400">
                Whether deploying on-device <strong className="text-white font-semibold">RAG pipelines</strong>, authoring <strong className="text-white font-semibold">6DOF hand-tracked spatial interaction mechanics in Unity</strong>, or orchestrating <strong className="text-white font-semibold">autonomous n8n workflows</strong>, I approach every project with intentional architecture and high visual craftsmanship.
              </p>
            </div>

            {/* Academic Foundation Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0f0f12]/90 border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-2 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                  ACADEMIC FOUNDATION
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 font-mono text-[10px] sm:text-[11px] text-neutral-300 whitespace-nowrap">
                  2023 — 2027
                </span>
              </div>
              <h4 className="font-bold text-white text-base sm:text-lg pt-1">
                Bachelor of Engineering in Computer Science and Design
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400">
                SNS College of Engineering (Autonomous, Affiliated to Anna University)
              </p>
            </div>

          </div>

          {/* Bottom Two Dark Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-8">
            
            {/* Card 3: FOCUS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f0f12]/90 hover:bg-neutral-900 border border-white/10 hover:border-white/20 transition-all shadow-lg space-y-2 group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
                  FOCUS
                </span>
                <Clock className="w-3.5 h-3.5 text-neutral-500 group-hover:text-accent-cyan transition-colors" />
              </div>
              <div className="font-sans text-xs sm:text-sm font-bold text-white">
                Spatial Computing + Intelligent Applications
              </div>
            </div>

            {/* Card 4: CURRENTLY */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f0f12]/90 hover:bg-neutral-900 border border-white/10 hover:border-white/20 transition-all shadow-lg space-y-2 group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
                  CURRENTLY
                </span>
                <Code className="w-3.5 h-3.5 text-neutral-500 group-hover:text-accent-cyan transition-colors" />
              </div>
              <div className="font-sans text-xs sm:text-sm font-bold text-white">
                Building experimental AI + XR systems
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
