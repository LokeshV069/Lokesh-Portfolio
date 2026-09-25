import React from 'react';
import SectionLabel from '../components/SectionLabel';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { Award, Star, Compass, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Achievements and Activities"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <SectionLabel label="// ACTIVITY LOG" status="VERIFIED RECORDS" accent="lime" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            ACHIEVEMENTS
            <br />
            & INVOLVEMENT.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl pt-2">
            Verified milestones across national competitions, department leadership, industrial immersions, and academic recognition.
          </p>
        </div>

        {/* Compact Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.id}
              onMouseEnter={() => audioEngine.playHoverTone()}
              className="p-6 rounded-2xl bg-neutral-950/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-accent-cyan uppercase tracking-widest font-semibold">
                    {ach.category}
                  </span>
                  <span className="text-neutral-500">{ach.year}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-neutral-100 transition-colors">
                  {ach.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-neutral-500 flex items-center justify-between">
                <span>{ach.organization}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-accent-lime transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
