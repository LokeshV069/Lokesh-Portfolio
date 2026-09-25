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

  // Smooth Navigation with Shared Element Mask Reveal
  const handleNavigate = (href) => {
    audioEngine.playClickChime();

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      // Calculate smooth target scroll position with offset for floating navbar
      const navOffset = 70;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });

      // Trigger shared element mask sweep animation on target section
      target.classList.remove('section-mask-sweep');
      void target.offsetWidth; // Force reflow to re-trigger animation
      target.classList.add('section-mask-sweep');

      // Ensure all reveal elements in the destination section activate immediately
      const hiddenElements = target.querySelectorAll('.reveal-init:not(.is-revealed)');
      hiddenElements.forEach((el) => {
        el.classList.add('is-revealed');
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F5F5F5] selection:bg-white selection:text-black">
      {/* 1. Intro Transition & System Boot sequence */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* 2. Floating Section HUD */}
      <ScrollProgress onNavigate={handleNavigate} />

      {/* 3. Global Fixed Floating Pill Navigation */}
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
