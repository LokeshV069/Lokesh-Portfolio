import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const handleCardClick = () => {
    audioEngine.playModalOpen();
    onOpenCaseStudy(project);
  };

  const staggerNum = project.number ? parseInt(project.number, 10) : 1;
  const staggerClass = `stagger-${Math.min(8, Math.max(1, staggerNum))}`;

  // 1. Featured Wide Card Layout (Card 05: WealthPilot AI)
  if (project.featured) {
    return (
      <article
        onClick={handleCardClick}
        onMouseEnter={() => audioEngine.playHoverTone()}
        className={`group md:col-span-2 lg:col-span-2 relative rounded-2xl bg-[#0C0C0D] border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 p-5 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1 reveal-init reveal-pop ${staggerClass}`}
      >
        {/* Top Badges Bar */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold text-white tracking-widest">
              {project.number}
            </span>
            <div className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 font-mono text-[10px] font-bold text-neutral-200 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-white" />
              <span>FEATURED</span>
            </div>
          </div>

          {/* Top Right External Link Icon */}
          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4 stroke-[2]" />
          </div>
        </div>

        {/* Card Body: Split Grid between Left Info and Right Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Logo + Title + Subtitle + Description + Tags + Button */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Stacked 3D Diamond Logo Icon */}
              <div className="w-8 h-8 mb-2.5 text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full fill-none stroke-current"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-xs sm:text-sm font-medium text-neutral-400 mt-0.5">
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed mt-2.5 max-w-md">
                {project.shortDescription}
              </p>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {project.techTags.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-neutral-300 font-mono text-[10px] font-medium border border-white/15"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-sans font-bold text-xs hover:bg-neutral-200 transition-colors shadow-sm group/btn"
              >
                <span>View Project</span>
                <ArrowRight className="w-3 h-3 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Wide Dashboard Preview */}
          <div className="lg:col-span-6 relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black group-hover:border-white/20 transition-all">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </article>
    );
  }

  // 2. Standard 1-Column White Card Layout (Cards 01, 02, 03, 04)
  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={() => audioEngine.playHoverTone()}
      className={`group relative rounded-2xl bg-white border border-neutral-200/90 hover:border-black/30 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1 reveal-init reveal-pop ${staggerClass}`}
    >
      {/* 1. Top Image Banner with Number Tag & External Link Icon */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black mb-3.5">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Monospace Index Badge (01, 02, etc.) in Top Left */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold text-white tracking-widest">
          {project.number}
        </div>

        {/* Top Right External Link Icon */}
        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
        </div>
      </div>

      {/* 2. Middle Content Area: Title & Description */}
      <div className="px-1.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-[19px] font-extrabold tracking-tight text-neutral-950 mb-1 group-hover:text-black transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* 3. Bottom Row: Technology Pills & View Project Action */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-1 overflow-hidden max-w-[65%]">
            {project.techTags.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-mono text-[10px] font-medium border border-neutral-200/70 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Project Link + Solid Circle Arrow */}
          <div className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-neutral-900 group-hover:text-black shrink-0 transition-colors">
            <span>View Project</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-sm">
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
