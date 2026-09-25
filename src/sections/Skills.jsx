import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import SkillCard from '../components/SkillCard';
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

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Technical Arsenal and Skills"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <SectionLabel label="// TECHNICAL ARSENAL" status="CAPABILITIES" accent="cyan" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              WHAT I
              <br />
              BUILD WITH.
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-md">
            Production-grade competencies in spatial computing, AI systems, and modern full-stack web engineering. No inflated progress percentages—only verified capabilities.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-y border-white/10 py-4">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mr-2">
            CATEGORY:
          </span>
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-glow-white scale-105'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  );
}
