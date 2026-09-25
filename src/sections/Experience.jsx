import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import { EXPERIENCE_DATA } from '../data/experience';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Experience() {
  const [activeExp, setActiveExp] = useState(EXPERIENCE_DATA[0].id);

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Experience and Professional Timeline"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-2">
          <SectionLabel label="// EXPERIENCE INDEX" status="CHRONOLOGICAL" accent="cyan" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            EXPERIENCE &
            <br />
            ENGAGEMENTS.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl pt-2">
            Engineering internships, technical leadership, and collegiate software initiatives. Verified factual milestones without fabricated corporate history.
          </p>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, index) => {
            const isSelected = activeExp === exp.id;
            return (
              <div
                key={exp.id}
                onMouseEnter={() => {
                  audioEngine.playHoverTone();
                  setActiveExp(exp.id);
                }}
                onClick={() => {
                  audioEngine.playHoverTone();
                  setActiveExp(exp.id);
                }}
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900/90 border-white/40 shadow-2xl scale-[1.01]'
                    : 'bg-neutral-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Left Column: Role & Organization */}
                  <div className="space-y-2 lg:max-w-xs shrink-0">
                    <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.year}</span>
                      <span className="text-neutral-600">/</span>
                      <span className="text-neutral-400">{exp.period}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium">
                      <span>{exp.organization}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-xs font-mono text-neutral-500">{exp.location}</span>
                    </div>
                  </div>

                  {/* Middle Column: Detailed Description & Highlights */}
                  <div className="space-y-4 max-w-2xl">
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.highlights && isSelected && (
                      <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                        {exp.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Technology Badges */}
                  <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-1.5 shrink-0 pt-2 lg:pt-0">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
