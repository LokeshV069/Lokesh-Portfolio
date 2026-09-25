import React, { useState } from 'react';
import Loader from './sections/Loader';
import Navbar from './components/Navbar';
import SocialDock from './components/SocialDock';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import SpatialLab from './sections/SpatialLab';
import AISystems from './sections/AISystems';
import XRSection from './sections/XRSection';
import Skills from './sections/Skills';
import DesignSection from './sections/DesignSection';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-[#F5F5F5] selection:bg-white selection:text-black">
      {/* 1. Intro Transition & System Boot sequence */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* 2. Global Fixed Floating Pill Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* 4. Right-side Floating Social Dock */}
      <SocialDock soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* 5. Main Narrative Content Flow */}
      <main id="main-content" className="w-full overflow-x-hidden">
        {/* HERO SECTION */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* ABOUT SECTION (Who is Lokesh?) */}
        <About />

        {/* PROJECTS SECTION (Featured Works & Systems with Filter) */}
        <Projects onOpenCaseStudy={(proj) => setSelectedProject(proj)} />

        {/* 3D SPATIAL LAB (Interactive WebGL Geometry Lab) */}
        <SpatialLab />

        {/* AI SYSTEMS (Intelligence Layer & Node Graph) */}
        <AISystems onOpenCaseStudy={(proj) => setSelectedProject(proj)} />

        {/* XR / SPATIAL COMPUTING (From Screen to Space) */}
        <XRSection />

        {/* TECHNICAL ARSENAL / SKILLS */}
        <Skills />

        {/* INTERACTION DESIGN / UI/UX GALLERY */}
        <DesignSection />

        {/* EXPERIENCE INDEX (Editorial Timeline) */}
        <Experience />

        {/* ACTIVITY LOG & ACHIEVEMENTS */}
        <Achievements />

        {/* DIRECT TRANSMISSION / CONTACT */}
        <Contact />
      </main>

      {/* 6. Large Editorial Footer */}
      <Footer onOpenResume={() => setResumeOpen(true)} />

      {/* 7. Full-Screen Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      )}

      {/* 8. Full-Screen Printable Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
