import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const SECTIONS = [
  { id: 'home', num: '01', label: 'HOME' },
  { id: 'about', num: '02', label: 'ABOUT' },
  { id: 'projects', num: '03', label: 'PROJECTS' },
  { id: 'lab', num: '04', label: '3D LAB' },
  { id: 'skills', num: '05', label: 'SKILLS' },
  { id: 'contact', num: '06', label: 'CONTACT' }
];

export default function ScrollProgress({ onNavigate }) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [showFloatingHud, setShowFloatingHud] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, percent)));

      setShowFloatingHud(scrollTop > 250);

      // Detect active section
      const scrollPos = scrollTop + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sec);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextSection = () => {
    audioEngine.playClickChime();
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection.id);
    const nextIndex = (currentIndex + 1) % SECTIONS.length;
    const nextSection = SECTIONS[nextIndex];
    if (onNavigate) {
      onNavigate(`#${nextSection.id}`);
    } else {
      const el = document.getElementById(nextSection.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Ultra-Slim Top Laser Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-neutral-900/40 backdrop-blur-xs"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan transition-all duration-75 ease-out shadow-[0_0_12px_#00F0FF]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* 2. Floating Section Indicator (Bottom-Right) */}
      <aside
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out hidden sm:flex items-center gap-2 pointer-events-auto ${
          showFloatingHud ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Current Section Navigation"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black/95 backdrop-blur-xl border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.7)] group transition-all">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#00F0FF] animate-pulse" />
          <span className="font-mono text-[10px] text-neutral-400 tracking-wider">
            [{activeSection.num}/06]
          </span>
          <span className="font-mono text-[11px] font-bold text-white tracking-widest uppercase">
            {activeSection.label}
          </span>
          
          {/* Quick jump to next section button */}
          <button
            onClick={handleNextSection}
            onMouseEnter={() => audioEngine.playHoverTone()}
            title="Jump to Next Section"
            aria-label="Jump to Next Section"
            className="p-1 rounded-full bg-white/10 hover:bg-white text-neutral-300 hover:text-black transition-all ml-1"
          >
            <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </aside>
    </>
  );
}
