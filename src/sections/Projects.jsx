import React, { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS_DATA } from '../data/projects';
import { audioEngine } from '../utils/audioEngine';
import ProjectsCelestialScene from '../three/ProjectsCelestialScene';

export default function Projects({ onOpenCaseStudy }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = [
    'ALL',
    'AR / VR / XR',
    'AI / LLM',
    'WEB DEVELOPMENT',
    'UI / UX',
    'AUTOMATION'
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((proj) => {
      if (activeFilter === 'AR / VR / XR') {
        return (
          proj.filterCategory === 'AR / VR / XR' ||
          proj.techTags.some((t) => ['Unity', 'AR', 'XR', 'Vuforia', 'Hand Tracking'].includes(t))
        );
      }
      if (activeFilter === 'AI / LLM') {
        return (
          proj.filterCategory === 'AI / LLM' ||
          proj.techTags.some((t) => ['Gemini', 'AI Agents', 'n8n', 'Python', 'LangChain', 'Ollama', 'RAG', 'LLM', 'Streamlit'].includes(t))
        );
      }
      if (activeFilter === 'WEB DEVELOPMENT') {
        return (
          proj.techTags.some((t) => ['React.js', 'React', 'n8n', 'Web'].includes(t)) ||
          proj.id === 'wealthpilot-ai'
        );
      }
      if (activeFilter === 'UI / UX') {
        return (
          proj.techTags.includes('UI/UX') ||
          proj.category.includes('XR') ||
          proj.id === 'wealthpilot-ai'
        );
      }
      if (activeFilter === 'AUTOMATION') {
        return (
          proj.id === 'wealthpilot-ai' ||
          proj.techTags.some((t) => ['n8n', 'AI Agents', 'Automation'].includes(t))
        );
      }
      return true;
    });
  }, [activeFilter]);

  const handleFilterChange = (f) => {
    audioEngine.playHoverTone();
    setActiveFilter(f);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-black text-black overflow-hidden py-16 lg:py-24"
      aria-label="Featured Works and Systems"
    >
      {/* 1. Dramatic Diagonal Split Background */}
      {/* Left White / Light Gray Diagonal Shape */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[#F5F5F7] shadow-[25px_0_60px_rgba(0,0,0,0.65)] relative overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 56.6% 0, 45.7% 100%, 0 100%)'
          }}
        >
          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 bg-tech-grid opacity-15" />

          {/* Decorative circular guide line watermarks matching reference mockup */}
          <div className="absolute -left-28 top-[24%] w-[560px] h-[560px] rounded-full border border-black/[0.04] pointer-events-none" />
          <div className="absolute -left-44 top-[18%] w-[740px] h-[740px] rounded-full border border-black/[0.025] pointer-events-none" />
        </div>
      </div>

      {/* For mobile / tablet: light background for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F5F5F7] via-[#F5F5F7] to-black lg:hidden pointer-events-none" />

      {/* Dark Lunar Mountain Terrain (Right & Bottom Behind Card 05 & 03) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute right-0 bottom-0 w-[62%] h-[560px] bg-no-repeat bg-right-bottom bg-cover opacity-60 pointer-events-none"
          style={{
            backgroundImage: "url('/projects/projects_space_terrain.jpg')",
            WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 95%)',
            maskImage: 'linear-gradient(to top, black 50%, transparent 95%)'
          }}
        />
      </div>

      {/* 2. 3D Celestial Geodesic Sphere Scene (Right Dark Side) */}
      <div className="absolute top-6 right-0 w-full lg:w-[48%] h-[420px] lg:h-[480px] z-0 pointer-events-none hidden lg:block">
        <ProjectsCelestialScene />

        {/* Floating Right Stats Box: 05+ Projects, 03+ Domains, 100% Passion */}
        <div className="absolute bottom-6 right-10 xl:right-16 z-10 flex flex-col items-end pointer-events-auto">
          <div className="w-14 h-[1.5px] bg-white/40 mb-3.5 mr-auto" />
          <div className="flex items-center gap-7 xl:gap-11">
            <div className="text-left">
              <div className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight">05+</div>
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5">Projects</div>
            </div>
            <div className="text-left">
              <div className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight">03+</div>
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5">Domains</div>
            </div>
            <div className="text-left">
              <div className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight">100%</div>
              <div className="text-[11px] font-mono text-neutral-400 mt-0.5">Passion</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Top Architectural Meta Header */}
      <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 mb-8">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-wider">
          <div className="text-neutral-700">
            <span>LAT: 11.0168° // LON: 76.9533°</span>
            <div className="text-neutral-900 font-bold mt-0.5">// PROJECTS.EXE</div>
          </div>

          <div className="text-right hidden sm:block text-neutral-300">
            <div>BUILD • EXPLORE • CREATE</div>
            <div className="text-neutral-400 mt-0.5">// PORTFOLIO 2026</div>
          </div>
        </div>
      </div>

      {/* 4. Main Section Grid & Body */}
      <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Vertical Index Track (Desktop only) */}
          <div className="hidden 2xl:flex flex-col gap-6 pt-4 shrink-0 text-neutral-500 font-mono text-xs select-none relative pl-2">
            <div className="absolute left-0 top-3 bottom-2 w-[1px] bg-neutral-300" />
            <div className="flex items-center gap-2 font-bold text-black relative">
              <span className="w-4 h-[1.5px] bg-black inline-block -ml-2" />
              <span className="w-2 h-2 rounded-full bg-black inline-block -ml-2.5" />
              <span className="pl-1">01 PROJECTS</span>
            </div>
            <div className="pl-4 text-neutral-400 hover:text-black transition-colors cursor-pointer">
              <span>02 EXPERIENCE</span>
            </div>
            <div className="pl-4 text-neutral-400 hover:text-black transition-colors cursor-pointer">
              <span>03 ACHIEVEMENTS</span>
            </div>
          </div>

          {/* Core Content: Header + Filter Pills + Project Cards Grid */}
          <div className="flex-1 w-full">
            
            {/* Header Area */}
            <div className="max-w-3xl mb-8">
              <div className="font-mono text-xs tracking-widest text-neutral-700 font-semibold mb-1">
                // MY WORK
              </div>

              {/* Title with 5 Diagonal Slashes */}
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-black uppercase">
                  PROJECTS
                </h2>
                <span className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-300 tracking-tight select-none">
                  /////
                </span>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 font-normal mt-3 max-w-2xl leading-relaxed">
                A collection of interactive, immersive and impactful projects built with technology, design and creativity.
              </p>
            </div>

            {/* Filter Pills Navigation */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-4 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-black text-white shadow-md scale-102'
                        : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-black border border-neutral-300/80 shadow-xs'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Project Cards Grid: 3 columns (Row 1: 01, 02, 03; Row 2: 04, 05 featured wide) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={onOpenCaseStudy}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 5. Bottom Architectural Meta Footer */}
      <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 mt-16 pt-6 border-t border-neutral-300/30 lg:border-white/10 flex items-center justify-between font-mono text-[10px] tracking-widest">
        <div className="text-neutral-900 font-bold">
          AI / XR / DESIGN / DEVELOPMENT
        </div>
        <div className="flex items-center gap-2 text-neutral-300">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
