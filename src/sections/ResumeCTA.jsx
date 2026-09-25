import React from 'react';
import { Download, FileText, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon } from '../components/Icons';
import Button from '../components/Button';
import { audioEngine } from '../utils/audioEngine';

export default function ResumeCTA({ onOpenResume }) {
  return (
    <section
      id="resume"
      className="py-28 sm:py-40 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Resume and Dossier Call to Action"
    >
      {/* Background Animated Grid & Radial Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center space-y-8">
        
        {/* Sub-label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-neutral-400">
          <FileText className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="uppercase tracking-widest">CURRICULUM VITAE // 2026</span>
        </div>

        {/* Giant White Typography */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95]">
          WANT THE
          <br />
          FULL PROFILE?
        </h2>

        <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Comprehensive breakdown of engineering projects, architecture diagrams, academic coursework, and verified skill taxonomies.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            icon={Download}
            onClick={() => {
              audioEngine.playClickChime();
              if (onOpenResume) onOpenResume();
            }}
            className="shadow-2xl"
          >
            DOWNLOAD RESUME
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={ArrowUpRight}
            href="https://www.linkedin.com/in/lokesh--v/"
            target="_blank"
            rel="noreferrer"
            data-cursor="external"
          >
            VIEW LINKEDIN
          </Button>
        </div>

        {/* Subtle Tech Note */}
        <div className="pt-8 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
          FORMAT: PDF / 2-PAGE ARCHITECTURAL SUMMARY
        </div>

      </div>
    </section>
  );
}
