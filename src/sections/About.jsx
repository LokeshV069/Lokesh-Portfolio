import React from 'react';
import SectionLabel from '../components/SectionLabel';
import { Terminal, Code, Cpu, Compass } from 'lucide-react';

export default function About() {
  const metadata = [
    { label: 'DISCIPLINE', value: 'Software Engineering', icon: Code },
    { label: 'SPECIALIZATION', value: 'XR / AI / Interactive Systems', icon: Cpu },
    { label: 'FOCUS', value: 'Spatial Computing + Intelligent Applications', icon: Compass },
    { label: 'CURRENTLY', value: 'Building experimental AI + XR systems', icon: Terminal }
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="About Lokesh V"
    >
      {/* Background dot grid pattern */}
      <div className="absolute inset-0 bg-tech-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-2">
          <SectionLabel label="// PROFILE INITIALIZATION" status="VERIFIED" accent="cyan" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            ABOUT ME
          </h2>
        </div>

        {/* Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Large Typography Statement */}
          <div className="lg:col-span-6 space-y-6">
            <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
              // DESIGN PHILOSOPHY
            </p>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.05]">
              I BUILD SYSTEMS
              <br />
              <span className="text-neutral-500">THAT PEOPLE</span>
              <br />
              CAN EXPERIENCE.
            </h3>
            <p className="text-neutral-400 font-mono text-xs leading-relaxed max-w-md pt-4 border-t border-white/10">
              Transforming abstract algorithms into tangible spatial interfaces and intelligent contextual workflows.
            </p>
          </div>

          {/* RIGHT: Professional Description & Education */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              <p>
                I am a <strong className="text-white font-medium">Computer Science and Design</strong> engineer focused on building interactive experiences across XR, AI, automation, and modern web technologies.
              </p>
              <p className="text-neutral-400">
                I enjoy combining rigorous engineering, human-centered visual design, and emerging technologies to create software systems that are both computationally robust and immediately engaging.
              </p>
              <p className="text-neutral-400">
                Whether deploying on-device RAG pipelines, authoring 6DoF hand-tracked spatial interaction mechanics in Unity, or orchestrating autonomous n8n workflows, I approach every project with intentional architecture and high visual craftsmanship.
              </p>
            </div>

            {/* Institution Highlight */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
                  ACADEMIC FOUNDATION
                </span>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Bachelor of Engineering in Computer Science and Design
                </h4>
                <p className="text-xs text-neutral-400">
                  SNS College of Engineering (Autonomous, Affiliated to Anna University)
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-accent-cyan whitespace-nowrap">
                2023 – 2027
              </span>
            </div>
          </div>

        </div>

        {/* Small Metadata Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          {metadata.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-5 rounded-xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                    {item.label}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-neutral-600 group-hover:text-accent-cyan transition-colors" />
                </div>
                <div className="font-mono text-sm font-semibold text-white">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
