import React from 'react';
import { ArrowUp, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { audioEngine } from '../utils/audioEngine';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    audioEngine.playClickChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'WORKS', href: '#projects' },
    { label: '3D LAB', href: '#lab' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' }
  ];

  return (
    <footer
      className="bg-black border-t border-white/15 pt-20 pb-12 text-neutral-400 relative overflow-hidden"
      aria-label="Portfolio Footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/20 flex items-center justify-center">
                <span className="font-mono text-sm font-black text-white">L</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white font-mono">
                LOKESH V
              </h2>
            </div>

            <p className="font-mono text-xs text-neutral-400 max-w-sm leading-relaxed">
              Software Engineer | XR Developer | AI / RAG Developer | UI/UX Designer
            </p>

            <p className="font-mono text-[11px] text-neutral-500">
              B.E. Computer Science and Design • SNS College of Engineering
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-neutral-300">
              <a
                href="https://github.com/lokeshv-dev"
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="hover:text-white transition-colors"
              >
                GITHUB
              </a>
              <span className="text-neutral-700">•</span>
              <a
                href="https://linkedin.com/in/lokesh-valmeeki"
                target="_blank"
                rel="noreferrer"
                data-cursor="external"
                className="hover:text-white transition-colors"
              >
                LINKEDIN
              </a>
              <span className="text-neutral-700">•</span>
              <a
                href="mailto:lokesh.valmeeki@gmail.com"
                className="hover:text-white transition-colors"
              >
                EMAIL
              </a>
            </div>
          </div>

          {/* Quick Nav Links Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">
              SYSTEM DIRECTORY
            </span>
            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => audioEngine.playHoverTone()}
                  onClick={(e) => {
                    e.preventDefault();
                    audioEngine.playClickChime();
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Actions & Back to Top Column */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-6">
            <button
              onClick={scrollToTop}
              onMouseEnter={() => audioEngine.playHoverTone()}
              aria-label="Back to Top"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 border border-white/15 text-neutral-300 hover:text-white hover:border-white/40 font-mono text-xs tracking-wider transition-all"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                audioEngine.playClickChime();
                if (onOpenResume) onOpenResume();
              }}
              onMouseEnter={() => audioEngine.playHoverTone()}
              className="font-mono text-xs text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
            >
              VIEW RESUME DOSSIER →
            </button>
          </div>

        </div>

        {/* Bottom Technical Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>
            © 2026 Lokesh V. All rights reserved.
          </div>
          <div className="tracking-wider uppercase text-neutral-400">
            BUILT WITH CODE × DESIGN × CURIOSITY
          </div>
        </div>

      </div>
    </footer>
  );
}
