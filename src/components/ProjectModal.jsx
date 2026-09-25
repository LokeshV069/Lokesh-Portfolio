import React, { useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, ExternalLink, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { audioEngine } from '../utils/audioEngine';
import { PROJECTS_DATA } from '../data/projects';

export default function ProjectModal({ project, onClose, onSelectProject }) {
  const modalContentRef = useRef(null);

  // Keyboard navigation: Escape closes modal, Left/Right arrow keys cycle projects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        audioEngine.playModalClose();
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNextProject();
      } else if (e.key === 'ArrowLeft') {
        goToPrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS_DATA[(currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  const goToNextProject = () => {
    audioEngine.playHoverTone();
    onSelectProject(nextProject);
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevProject = () => {
    audioEngine.playHoverTone();
    onSelectProject(prevProject);
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const study = project.fullCaseStudy;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl overflow-y-auto flex flex-col items-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Floating Modal Control Bar */}
      <div className="sticky top-4 z-20 flex items-center justify-between w-full max-w-5xl py-2 px-5 rounded-full bg-neutral-900/90 border border-white/20 backdrop-blur-xl shadow-2xl mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-400">PROJECT {project.number}</span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-xs text-accent-cyan font-bold tracking-wider uppercase">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Prev Project */}
          <button
            onClick={goToPrevProject}
            onMouseEnter={() => audioEngine.playHoverTone()}
            title={`Previous: ${prevProject.title}`}
            aria-label="Previous Project"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Next Project */}
          <button
            onClick={goToNextProject}
            onMouseEnter={() => audioEngine.playHoverTone()}
            title={`Next: ${nextProject.title}`}
            aria-label="Next Project"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            onClick={() => {
              audioEngine.playModalClose();
              onClose();
            }}
            aria-label="Close Case Study"
            className="p-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dossier Container */}
      <article
        ref={modalContentRef}
        className="w-full max-w-5xl bg-neutral-950 rounded-3xl border border-white/15 p-6 sm:p-10 lg:p-14 shadow-2xl space-y-12"
      >
        {/* Header Section */}
        <header className="border-b border-white/10 pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              // ARCHITECTURAL DOSSIER — SYSTEM SPECIFICATION
            </span>
            <div className="flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span>{project.status}</span>
            </div>
          </div>

          <h1 id="modal-project-title" className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-neutral-400">
            <div>
              <span className="text-neutral-600 block uppercase">YEAR</span>
              <span className="text-white">{project.year}</span>
            </div>
            <div>
              <span className="text-neutral-600 block uppercase">CATEGORY</span>
              <span className="text-white">{project.category}</span>
            </div>
            <div>
              <span className="text-neutral-600 block uppercase">CORE FOCUS</span>
              <span className="text-white">{project.keyCapability}</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: OVERVIEW (Problem, Goal, Solution) */}
        {study?.overview && (
          <section className="space-y-6">
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              01 // OVERVIEW & STRATEGIC INTENT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
                <span className="font-mono text-xs text-accent-crimson font-bold uppercase tracking-wider block">
                  THE PROBLEM
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed">{study.overview.problem}</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
                <span className="font-mono text-xs text-accent-cyan font-bold uppercase tracking-wider block">
                  THE GOAL
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed">{study.overview.goal}</p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3">
                <span className="font-mono text-xs text-accent-lime font-bold uppercase tracking-wider block">
                  THE SOLUTION
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed">{study.overview.solution}</p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: SYSTEM ARCHITECTURE (Interactive Flow Diagram) */}
        {study?.architecture && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                02 // SYSTEM ARCHITECTURE & DATA FLOW
              </h2>
              <span className="font-mono text-[10px] text-neutral-500 uppercase">
                DIRECT RUNTIME PIPELINE
              </span>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-black border border-white/15 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {study.architecture.map((node, i) => (
                  <div key={node.step} className="flex flex-col relative group">
                    <div className="p-4 rounded-xl bg-neutral-900/90 border border-white/15 group-hover:border-accent-cyan/80 transition-all flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-neutral-500 font-bold">
                          {node.step}
                        </span>
                        <Cpu className="w-3.5 h-3.5 text-neutral-600 group-hover:text-accent-cyan transition-colors" />
                      </div>
                      <h4 className="font-mono text-xs font-bold text-white mb-2 leading-tight">
                        {node.node}
                      </h4>
                      <p className="text-[11px] text-neutral-400 leading-normal">{node.detail}</p>
                    </div>

                    {/* Arrow between nodes for desktop */}
                    {i < study.architecture.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-neutral-600 group-hover:text-accent-cyan transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: TECHNOLOGY STACK */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
            03 // TECHNOLOGY ARSENAL
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.techTags.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 font-mono text-xs font-medium text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 4: KEY FEATURES */}
        {study?.features && (
          <section className="space-y-6">
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              04 // CORE ARCHITECTURAL CAPABILITIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {study.features.map((feat) => (
                <div
                  key={feat.title}
                  className="p-5 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/25 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                    <h4 className="font-bold text-sm text-white">{feat.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed pl-6">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: PROCESS (01 Research to 05 Iterate) */}
        {study?.process && (
          <section className="space-y-6">
            <h2 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              05 // ENGINEERING & DESIGN PROCESS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {study.process.map((step) => (
                <div
                  key={step.phase}
                  className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-2"
                >
                  <span className="font-mono text-[10px] text-accent-cyan font-bold block">
                    {step.phase}
                  </span>
                  <h4 className="font-mono text-xs font-bold text-white uppercase">{step.name}</h4>
                  <p className="text-[11px] text-neutral-400 leading-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: RESULTS & LEARNINGS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-3">
            <span className="font-mono text-xs text-white/50 tracking-wider uppercase block">
              VERIFIED RESULT
            </span>
            <p className="text-sm text-neutral-200 leading-relaxed">{study?.result}</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-3">
            <span className="font-mono text-xs text-white/50 tracking-wider uppercase block">
              KEY TECHNICAL LEARNING
            </span>
            <p className="text-sm text-neutral-200 leading-relaxed">{study?.learnings}</p>
          </div>
        </section>

        {/* SECTION 7: FOOTER CONTROLS & GITHUB */}
        <footer className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {study?.links?.github && (
              <a
                href={study.links.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs font-bold transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>INSPECT REPOSITORY</span>
              </a>
            )}
            {study?.links?.demo && (
              <a
                href={study.links.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 border border-white/20 font-mono text-xs font-bold transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE SYSTEM</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevProject}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 font-mono text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>
            <button
              onClick={goToNextProject}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 font-mono text-xs transition-colors"
            >
              <span>NEXT PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
