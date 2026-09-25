import React, { useState } from 'react';
import Loader from './sections/Loader';
import Navbar from './components/Navbar';
import SocialDock from './components/SocialDock';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import SpatialLab from './sections/SpatialLab';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Initialize master-level scroll reveal observer
  useScrollReveal();

  // Page Transition Warp State
  const [transitionState, setTransitionState] = useState({
    active: false,
    label: '',
    num: ''
  });

  const sectionMeta = {
    '#home': { label: 'HOME', num: '01' },
    '#about': { label: 'ABOUT ME', num: '02' },
    '#projects': { label: 'PROJECTS', num: '03' },
    '#lab': { label: '3D PRIMITIVES LAB', num: '04' },
    '#skills': { label: 'SKILLS & TECH', num: '05' },
    '#contact': { label: 'DIRECT TRANSMISSION', num: '06' }
  };

  const handleNavigate = (href) => {
    const meta = sectionMeta[href] || { label: href.replace('#', '').toUpperCase(), num: '00' };

    audioEngine.playClickChime();

    // Trigger cinematic warp shutter
    setTransitionState({
      active: true,
      label: meta.label,
      num: meta.num
    });

    // In 240ms (when shutter panels are closed at center), scroll seamlessly
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
      }
    }, 240);

    // End transition in 620ms
    setTimeout(() => {
      setTransitionState({ active: false, label: '', num: '' });
    }, 620);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F5F5F5] selection:bg-white selection:text-black">
      {/* 1. Intro Transition & System Boot sequence */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* 2. Top Laser Progress Bar & Floating Section HUD */}
      <ScrollProgress onNavigate={handleNavigate} />

      {/* 3. Cinematic Warp Shutter Transition Overlay */}
      <PageTransition
        isTransitioning={transitionState.active}
        targetLabel={transitionState.label}
        targetNum={transitionState.num}
      />

      {/* 4. Global Fixed Floating Pill Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onNavigate={handleNavigate}
      />

      {/* 5. Right-side Floating Social Dock */}
      <SocialDock soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* 6. Main Narrative Content Flow */}
      <main id="main-content" className="w-full overflow-x-hidden">
        {/* HERO SECTION */}
        <Hero onOpenResume={() => setResumeOpen(true)} onNavigate={handleNavigate} />

        {/* ABOUT SECTION (Who is Lokesh?) */}
        <About />

        {/* PROJECTS SECTION (Featured Works & Systems with Filter) */}
        <Projects onOpenCaseStudy={(proj) => setSelectedProject(proj)} />

        {/* 3D SPATIAL LAB (Interactive WebGL Geometry Lab) */}
        <SpatialLab />

        {/* TECHNICAL ARSENAL / SKILLS */}
        <Skills />

        {/* DIRECT TRANSMISSION / CONTACT */}
        <Contact />
      </main>

      {/* 7. Large Editorial Footer */}
      <Footer onOpenResume={() => setResumeOpen(true)} onNavigate={handleNavigate} />

      {/* 8. Full-Screen Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      )}

      {/* 9. Full-Screen Printable Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
