import React, { useState } from 'react';
import { Layers, Box, Zap, ArrowUpRight } from 'lucide-react';
import SkillCard from '../components/SkillCard';
import SkillsCelestialScene from '../three/SkillsCelestialScene';
import { SKILLS_DATA, SKILL_CATEGORIES } from '../data/skills';
import { audioEngine } from '../utils/audioEngine';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredSkills = activeCategory === 'ALL'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const handleCategoryClick = (cat) => {
    audioEngine.playHoverTone();
    setActiveCategory(cat);
  };

  // Top row (01-05) and Bottom row (06-09) when "ALL" is selected
  const topRowSkills = SKILLS_DATA.slice(0, 5);
  const bottomRowSkills = SKILLS_DATA.slice(5, 9);

  return (
    <section
      id="skills"
      className="w-full relative py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-neutral-800 selection:bg-neutral-900 selection:text-white"
      aria-label="What I Build With — Technical Skills and Frameworks"
    >
      {/* ================================================================= */}
      {/* 1. DUAL SPLIT BACKGROUND: Architectural Light Left & Cosmic Right */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* SVG Dividing Path Between Off-White Studio Space and Deep Space */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          {/* Left Side: Off-White Studio Background */}
          <path
            d="M 0 0 L 740 0 C 780 220, 710 460, 620 620 C 540 760, 580 840, 600 900 L 0 900 Z"
            fill="#F4F4F6"
          />
          {/* Right Side: Deep Black Space Background */}
          <path
            d="M 740 0 L 1440 0 L 1440 900 L 600 900 C 580 840, 540 760, 620 620 C 710 460, 780 220, 740 0 Z"
            fill="#000000"
          />
        </svg>

        {/* Photorealistic Celestial Horizon Texture Blend on the Right Side */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-40 bg-cover bg-left pointer-events-none mix-blend-screen"
          style={{ backgroundImage: "url('/loader_celestial_bg.jpg')" }}
        />

        {/* Interactive Three.js Scene: Floating 3D Shapes (Left) & Planet with Orbital Rings (Right) */}
        <SkillsCelestialScene />
      </div>

      {/* ================================================================= */}
      {/* 2. RIGHT-SIDE FLOATING ARCHITECTURAL INDEX & DOT RAIL             */}
      {/* ================================================================= */}
      <div
        className="hidden 2xl:flex flex-col items-end absolute top-36 right-10 z-20 space-y-8 select-none pointer-events-none text-right"
        aria-hidden="true"
      >
        <div className="space-y-1.5 font-mono text-[10px] tracking-widest text-neutral-400 uppercase leading-relaxed">
          <p className="text-white font-bold">SPATIAL</p>
          <p className="text-neutral-300">INTELLIGENCE</p>
          <p className="text-neutral-400">AI AUTOMATION</p>
          <p className="text-neutral-500">INTERACTIVE SYSTEMS</p>
          <p className="text-neutral-500">REAL-WORLD IMPACT</p>
        </div>

        {/* Vertical Dot Rail */}
        <div className="flex flex-col items-center gap-2 pr-1 opacity-60">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-neutral-600'}`}
            />
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. MAIN SECTION CONTENT                                           */}
      {/* ================================================================= */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 space-y-10">
        
        {/* Header Block: Title & Philosophy */}
        <div className="max-w-2xl space-y-4 reveal-init reveal-slide-up">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-neutral-300/80 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            <span className="font-mono text-[11px] font-semibold tracking-widest text-neutral-700 uppercase">
              // SKILLS & TECHNOLOGIES
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            <span className="text-neutral-950">WHAT I </span>
            <br className="sm:hidden" />
            <span className="text-neutral-400">BUILD </span>
            <span className="text-neutral-950">WITH.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
            A curated set of tools, frameworks, and technologies I use to build immersive, intelligent, and interactive experiences.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 reveal-init reveal-fade stagger-1">
          <span className="font-mono text-[11px] font-bold text-neutral-600 uppercase tracking-widest mr-1">
            CATEGORY:
          </span>
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-white/85 text-neutral-700 hover:text-black hover:bg-white border border-neutral-300/90 shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* =============================================================== */}
        {/* 4. THE SKILL CARDS GRID                                         */}
        {/* =============================================================== */}
        {activeCategory === 'ALL' ? (
          /* Exact 5-over-4 Layout from Mockup */
          <div className="space-y-4 sm:space-y-5">
            {/* Top Row: 5 Cards (Python, Java, Unity, Vuforia, XR / Hand Tracking) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {topRowSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            {/* Bottom Row: 4 Cards (LLM / RAG, n8n Automation, React, UI/UX & Figma) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {bottomRowSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ) : (
          /* Filtered View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}

        {/* =============================================================== */}
        {/* 5. BOTTOM METRIC HUD BAR                                        */}
        {/* =============================================================== */}
        <div className="w-full rounded-2xl bg-[#0c0c0e]/95 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Metric 1: Technologies */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="font-sans text-xl sm:text-2xl font-black text-white leading-none">
                  10+
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                  Technologies
                </div>
              </div>
            </div>

            {/* Metric 2: Core Domains */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <div className="font-sans text-xl sm:text-2xl font-black text-white leading-none">
                  3
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                  Core Domains
                </div>
              </div>
            </div>

            {/* Metric 3: Full-Stack */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-sans text-lg sm:text-xl font-bold text-white leading-none">
                  Full-Stack
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-1">
                  Building End-to-End
                </div>
              </div>
            </div>

            {/* Metric 4: Real Impact */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <div className="font-sans text-lg sm:text-xl font-bold text-white leading-none">
                  Real Impact
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-1">
                  From Ideas to Experiences
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
