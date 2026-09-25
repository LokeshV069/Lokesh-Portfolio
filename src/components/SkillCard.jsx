import React from 'react';
import { Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function SkillCard({ skill }) {
  return (
    <div
      onMouseEnter={() => audioEngine.playHoverTone()}
      className="p-5 rounded-2xl bg-neutral-950/80 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Subtle accent line on top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: skill.accent || '#00F0FF' }}
      />

      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
            {skill.category}
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">
            {skill.level}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-neutral-100">
          {skill.name}
        </h3>

        <p className="text-xs text-neutral-400 leading-relaxed mb-4">
          {skill.shortDescription}
        </p>
      </div>

      <div className="pt-3 border-t border-white/[0.08]">
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 block mb-2">
          CORE CAPABILITIES
        </span>
        <div className="flex flex-wrap gap-1.5">
          {skill.capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] font-mono text-[10px] text-neutral-300"
            >
              <Check className="w-2.5 h-2.5 text-accent-cyan" />
              <span>{cap}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
