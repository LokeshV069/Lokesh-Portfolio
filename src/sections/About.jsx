import React from 'react';
import { Code, Clock } from 'lucide-react';
import AboutObjectsScene from '../three/AboutObjectsScene';
import AboutIcosahedron from '../three/AboutIcosahedron';
import AboutSparkle from '../three/AboutSparkle';

export default function About() {
  return (
    <section
      id="about"
      className="w-full relative overflow-hidden border-t border-neutral-800 bg-black selection:bg-neutral-800 selection:text-white"
      aria-label="About Lokesh V"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[920px]">
        
        {/* ================================================================= */}
        {/* LEFT COLUMN: Architectural Off-White Studio Space (#F4F4F6)       */}
        {/* ================================================================= */}
        <div className="relative bg-[#F4F4F6] text-neutral-900 p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-black/10">
          
          {/* Top Row: Floating 3D Icosahedron & Profile Typography Side-by-Side */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8 relative z-10 reveal-init reveal-mask">
            
            {/* 3D Faceted Icosahedron Sphere — Dedicated Left Slot (Zero overlap with text) */}
            <div 
              className="hidden sm:flex flex-shrink-0 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 items-center justify-center sm:mt-12 lg:mt-16 select-none pointer-events-none"
              aria-hidden="true"
            >
              <AboutIcosahedron />
            </div>

            {/* Typography Content Block */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              
              {/* Profile Meta Tag */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  // PROFILE
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 uppercase leading-none">
                ABOUT ME
              </h2>

              {/* Design Philosophy Subhead */}
              <div className="pt-3 sm:pt-4 space-y-3">
                <p className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  // DESIGN PHILOSOPHY
                </p>

                {/* Impact Statement */}
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-black tracking-tighter text-neutral-950 uppercase leading-[1.05]">
                  I BUILD SYSTEMS
                  <br />
                  THAT PEOPLE
                  <br />
                  CAN EXPERIENCE.
                </h3>

                {/* Sub-description */}
                <p className="font-mono text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md pt-1">
                  Transforming abstract algorithms into tangible spatial interfaces and intelligent contextual workflows.
                </p>
              </div>

            </div>

          </div>

          {/* Middle: Dedicated Three.js 3D Objects Showcase (Isometric Cube & Torus with Contact Shadows) */}
          <div className="w-full h-56 sm:h-64 md:h-72 my-6 sm:my-8 relative z-10 flex items-center justify-center reveal-init reveal-pop stagger-1">
            <AboutObjectsScene />
          </div>

          {/* Bottom: Two Light Studio Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-2 reveal-init reveal-slide-up stagger-2">
            
            {/* Card 1: DISCIPLINE */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EAEAEB] hover:bg-[#E2E2E4] border border-black/10 transition-all shadow-sm space-y-2 group">
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
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EAEAEB] hover:bg-[#E2E2E4] border border-black/10 transition-all shadow-sm space-y-2 group">
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

        {/* ================================================================= */}
        {/* RIGHT COLUMN: Deep Pure Black Column (#000000)                    */}
        {/* ================================================================= */}
        <div className="relative bg-black text-white p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle 3D Metallic Star in Lower-Right */}
          <div 
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none z-0 opacity-70"
            aria-hidden="true"
          >
            <AboutSparkle />
          </div>

          {/* Top: Bio Narrative Paragraphs */}
          <div className="relative z-10 space-y-5 text-sm sm:text-[15px] lg:text-base text-neutral-300 leading-relaxed font-sans max-w-xl reveal-init reveal-mask">
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

          {/* Middle: Academic Foundation Card */}
          <div className="my-6 sm:my-8 p-5 sm:p-6 rounded-2xl bg-[#0f0f12] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-2 backdrop-blur-sm max-w-xl relative z-10 reveal-init reveal-scale stagger-1">
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

          {/* Bottom: Two Dark Glass Cards (Horizontally Aligned with Left Bottom Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-2 reveal-init reveal-slide-up stagger-2">
            
            {/* Card 3: FOCUS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f0f12] hover:bg-neutral-900 border border-white/10 hover:border-white/20 transition-all shadow-lg space-y-2 group">
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
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f0f12] hover:bg-neutral-900 border border-white/10 hover:border-white/20 transition-all shadow-lg space-y-2 group">
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
