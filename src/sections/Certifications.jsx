import React from 'react';
import SectionLabel from '../components/SectionLabel';
import { CERTIFICATIONS_DATA } from '../data/certifications';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Verified Certifications and Credentials"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <SectionLabel label="// VERIFIED STACK" status="ACCREDITED" accent="cyan" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            CERTIFICATIONS.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl pt-2">
            Formal technical certifications and verified domain competencies in Generative AI, UI/UX architecture, and modern software development.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.id}
              onMouseEnter={() => audioEngine.playHoverTone()}
              className="p-6 rounded-2xl bg-neutral-950/80 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent-cyan font-bold uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">{cert.year}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                  {cert.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[10px] text-neutral-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-500">
                  {cert.credentialId}
                </span>

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="external"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-white hover:text-accent-cyan transition-colors"
                  >
                    <span>VERIFY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-[10px] text-accent-lime font-bold">
                    ✓ VERIFIED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
