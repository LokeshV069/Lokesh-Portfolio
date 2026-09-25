import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import {
  PythonLogo,
  JavaLogo,
  UnityLogo,
  VuforiaLogo,
  HandTrackingLogo,
  LLMRAGLogo,
  N8nLogo,
  ReactLogo,
  FigmaLogo
} from './TechLogos';
import { audioEngine } from '../utils/audioEngine';

const LOGO_MAP = {
  python: PythonLogo,
  java: JavaLogo,
  unity: UnityLogo,
  vuforia: VuforiaLogo,
  handTracking: HandTrackingLogo,
  llmRag: LLMRAGLogo,
  n8n: N8nLogo,
  react: ReactLogo,
  figma: FigmaLogo,
};

export default function SkillCard({ skill }) {
  const isLight = skill.theme === 'light';
  const LogoComponent = LOGO_MAP[skill.logoKey] || PythonLogo;
  const staggerNum = skill.id ? parseInt(skill.id, 10) : 1;
  const staggerClass = `stagger-${Math.min(8, Math.max(1, staggerNum))}`;

  return (
    <div
      onMouseEnter={() => audioEngine.playHoverTone()}
      className={`group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 select-none reveal-init reveal-pop ${staggerClass} ${
        isLight
          ? 'bg-white/95 text-neutral-900 border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-neutral-400 backdrop-blur-md'
          : 'bg-[#0e0e12]/95 text-white border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.6)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.85)] hover:border-white/25 backdrop-blur-md'
      }`}
    >
      <div>
        {/* Top Meta Header: Index, Category, Arrow */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`font-mono text-[11px] font-bold ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {skill.id}
          </span>
          <span className={`font-mono text-[9px] font-semibold tracking-widest uppercase ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {skill.category}
          </span>
          <ArrowUpRight
            className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isLight ? 'text-neutral-400 group-hover:text-black' : 'text-neutral-500 group-hover:text-white'
            }`}
          />
        </div>

        {/* Title & Brand Icon */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
              isLight
                ? 'bg-neutral-100 text-neutral-900'
                : 'bg-white/10 text-white'
            }`}
          >
            <LogoComponent className="w-5 h-5" />
          </div>
          <h3 className={`text-lg sm:text-xl font-black tracking-tight leading-tight ${isLight ? 'text-neutral-950' : 'text-white'}`}>
            {skill.name}
          </h3>
        </div>

        {/* Short Description */}
        <p className={`text-xs leading-relaxed mb-6 font-sans ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
          {skill.shortDescription}
        </p>
      </div>

      {/* Feature & Capability Pills Grid (2x2) */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {skill.capabilities.map((cap) => (
          <div
            key={cap}
            className={`px-2.5 py-1.5 rounded-full font-mono text-[10px] tracking-wide flex items-center gap-1.5 transition-colors truncate ${
              isLight
                ? 'bg-neutral-100/90 text-neutral-700 border border-neutral-200 group-hover:bg-neutral-200/70'
                : 'bg-white/[0.05] text-neutral-300 border border-white/10 group-hover:bg-white/[0.09]'
            }`}
            title={cap}
          >
            <Check className={`w-3 h-3 flex-shrink-0 stroke-[2.5] ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`} />
            <span className="truncate">{cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
