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
      className="relative min-h-screen w-full bg-black text-white overflow-hidden py-16 lg:py-24"
      aria-label="Featured Works and Systems"
    >
      {/* 1. Photorealistic Cosmic Architecture & Mountain Backdrop */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-85"
          style={{
            backgroundImage: "url('/projects/project_celestial_bg.png')"
          }}
        />
        {/* Subtle atmospheric vignette for high card readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />
      </div>

      {/* 2. Interactive 3D Three.js Animated Celestial Scene (Arc, Orbiting Planet, Moons, Parallax) */}
      <ProjectsCelestialScene />

      {/* Floating Right Stats Box: 05+ Projects, 03+ Domains, 100% Passion */}
      <div className="hidden lg:flex absolute top-28 right-10 xl:right-16 z-10 flex-col items-end pointer-events-auto">
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

      {/* 3. Top Architectural Meta Header */}
      <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 mb-8">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-wider">
          <div className="text-neutral-400">
            <span>LAT: 11.0168° // LON: 76.9533°</span>
            <div className="text-white font-bold mt-0.5">// PROJECTS.EXE</div>
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
          <div className="hidden 2xl:flex flex-col gap-6 pt-4 shrink-0 text-neutral-400 font-mono text-xs select-none relative pl-2">
            <div className="absolute left-0 top-3 bottom-2 w-[1px] bg-white/20" />
            <div className="flex items-center gap-2 font-bold text-white relative">
              <span className="w-4 h-[1.5px] bg-white inline-block -ml-2" />
              <span className="w-2 h-2 rounded-full bg-white inline-block -ml-2.5 shadow-[0_0_8px_white]" />
              <span className="pl-1">01 PROJECTS</span>
            </div>
          </div>

          {/* Core Content: Header + Filter Pills + Project Cards Grid */}
          <div className="flex-1 w-full">
            
            {/* Header Area */}
            <div className="max-w-3xl mb-8 reveal-init reveal-mask">
              <div className="font-mono text-xs tracking-widest text-accent-cyan font-semibold mb-1">
                // MY WORK
              </div>

              {/* Title with 5 Diagonal Slashes */}
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase">
                  PROJECTS
                </h2>
                <span className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-600 tracking-tight select-none">
                  /////
                </span>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 font-normal mt-3 max-w-2xl leading-relaxed">
                A collection of interactive, immersive and impactful projects built with technology, design and creativity.
              </p>
            </div>

            {/* Filter Pills Navigation */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 reveal-init reveal-fade stagger-1">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-4 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-102'
                        : 'bg-black/60 hover:bg-black/80 text-neutral-300 hover:text-white border border-white/20 hover:border-white/40 backdrop-blur-md'
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
      <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 mt-16 pt-6 border-t border-white/15 flex items-center justify-between font-mono text-[10px] tracking-widest">
        <div className="text-white/80 font-bold">
          AI / XR / DESIGN / DEVELOPMENT
        </div>
        <div className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
