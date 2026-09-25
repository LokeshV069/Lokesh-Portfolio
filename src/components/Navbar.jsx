import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Navbar({ onOpenResume, soundEnabled, setSoundEnabled, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracking for nav indicator
      const sections = ['home', 'about', 'projects', 'lab', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exact navigation items from Image 1
  const navItems = [
    { label: 'HOME', href: '#home', id: 'home', num: '01' },
    { label: 'ABOUT', href: '#about', id: 'about', num: '02' },
    { label: 'PROJECTS', href: '#projects', id: 'projects', num: '03' },
    { label: '3D LAB', href: '#lab', id: 'lab', num: '04' },
    { label: 'SKILLS', href: '#skills', id: 'skills', num: '05' },
    { label: 'CONTACT', href: '#contact', id: 'contact', num: '06' }
  ];

  const handleSoundToggle = () => {
    const newState = audioEngine.toggle();
    setSoundEnabled(newState);
  };

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      audioEngine.playClickChime();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl transition-all duration-300 rounded-full border border-white/10 ${
            scrolled
              ? 'py-2 px-5 bg-[#101010]/95 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] scale-[0.99]'
              : 'py-2.5 px-6 bg-[#121212]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* LEFT: Diamond Icon + Stacked Name (Like 2nd Image) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            onMouseEnter={() => audioEngine.playHoverTone()}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full py-1"
          >
            {/* Diamond Mark from Image 1 */}
            <svg
              className="w-3.5 h-3.5 text-white fill-current shrink-0 transform group-hover:rotate-45 transition-transform duration-300"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2L22 12L12 22L2 12Z" />
            </svg>

            {/* Exact Name Format from 2nd Image */}
            <div className="flex flex-col text-left leading-tight">
              <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-white group-hover:text-neutral-200 transition-colors">
                LOKESH V
              </span>
              <span className="font-mono text-[9px] text-neutral-400 tracking-wider">
                DEV // DESIGN
              </span>
            </div>
          </a>

          {/* CENTER: Navigation Links (HOME, ABOUT, PROJECTS, 3D LAB, SKILLS, CONTACT from Image 1) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  onMouseEnter={() => audioEngine.playHoverTone()}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* RIGHT: Circular White Sound Toggle + White Pill HIRE ME Button (from Image 1) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Audio Toggle Button - White Circle with Black Speaker Icon */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
              aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
              className="w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-black" />
              ) : (
                <VolumeX className="w-4 h-4 text-black" />
              )}
            </button>

            {/* Hire Me CTA Button - White Pill with Black Text */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              onMouseEnter={() => audioEngine.playHoverTone()}
              className="px-4 sm:px-5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs font-bold tracking-wider transition-all shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              HIRE ME
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                audioEngine.playClickChime();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-full bg-neutral-900 border border-white/15 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L22 12L12 22L2 12Z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-mono text-sm font-bold tracking-wider text-white">
                  LOKESH V
                </span>
                <span className="font-mono text-[9px] text-neutral-400 tracking-wider">
                  DEV // DESIGN
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                audioEngine.playModalClose();
                setMobileMenuOpen(false);
              }}
              aria-label="Close Menu"
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-5 my-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="group flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-neutral-500">{item.num}</span>
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-200 group-hover:text-white group-hover:translate-x-2 transition-all">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </nav>

          {/* Bottom Socials & Quick Action */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                DIRECT CHANNELS
              </span>
              <button
                onClick={handleSoundToggle}
                className="flex items-center gap-2 font-mono text-xs text-neutral-400"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
              </button>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs text-neutral-300">
              <a
                href="https://github.com/LokeshV069"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/lokesh--v/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href="mailto:lokesh.valmeeki@gmail.com"
                className="hover:text-white transition-colors"
              >
                EMAIL
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
