import React, { useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import { Layout, Smartphone, Monitor, Eye, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function DesignSection() {
  const scrollContainerRef = useRef(null);

  const designMockups = [
    {
      title: 'WealthPilot Pro Dashboard',
      category: 'FINANCIAL HUD / DARK UI',
      icon: Monitor,
      type: 'Desktop Web App',
      description: 'High-density dark-mode analytical console featuring live portfolio drift telemetry, asset weight heatmaps, and rebalancing triggers.',
      previewAspect: 'aspect-[16/10]',
      color: '#00F0FF',
      mockupElements: ['Portfolio Drift Radar', 'Variance Threshold Grid', 'Execution Ledger']
    },
    {
      title: 'Spatial Commerce AR Mobile',
      category: 'AR / MOBILE UI',
      icon: Smartphone,
      type: 'Mobile iOS / Android',
      description: 'Clean spatial overlay for floor-plane AR projection, surface lighting adaptation, and real-time dimension measurements.',
      previewAspect: 'aspect-[9/16]',
      color: '#10B981',
      mockupElements: ['Ground Lock Indicator', '1:1 Dimension Ruler', 'Material Selector']
    },
    {
      title: 'ChemVerse Spatial HUD',
      category: 'XR / SPATIAL INTERACTION',
      icon: Eye,
      type: 'VR / AR Headset',
      description: 'Volumetric floating periodic cards, molecular bond rotation manipulators, and distance-responsive text scaling.',
      previewAspect: 'aspect-[16/10]',
      color: '#8B5CF6',
      mockupElements: ['Orbital Density Cloud', 'Valency Radial Gauge', 'Pinch-to-Rotate Gizmo']
    },
    {
      title: 'Academic RAG Explorer',
      category: 'RESEARCH TERMINAL / LIGHT UI',
      icon: Layout,
      type: 'Desktop Web App',
      description: 'Clean editorial interface with dual split-screen document rendering, section citation anchors, and grounded Q&A sidebar.',
      previewAspect: 'aspect-[16/10]',
      color: '#FFFFFF',
      mockupElements: ['Source PDF Inspector', 'Chunk Citation Tagging', 'Local Model Grounding']
    }
  ];

  const scroll = (direction) => {
    audioEngine.playHoverTone();
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="design"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="UI and Interaction Design"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12">
        
        {/* Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <SectionLabel label="// INTERACTION DESIGN" status="SYSTEM DESIGN" accent="violet" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              DESIGNING
              <br />
              HOW SYSTEMS FEEL.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3 rounded-full bg-neutral-900 border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3 rounded-full bg-neutral-900 border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Design Philosophy Tags */}
        <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
          {['UI/UX', 'FIGMA', 'DESIGN SYSTEMS', 'PROTOTYPING', 'USER FLOWS', 'SPATIAL AFFORDANCES'].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Horizontally Scrolling Mockup Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {designMockups.map((mockup) => {
            const Icon = mockup.icon;
            return (
              <div
                key={mockup.title}
                onMouseEnter={() => audioEngine.playHoverTone()}
                className="shrink-0 w-[320px] sm:w-[440px] snap-center rounded-3xl bg-neutral-950 border border-white/15 p-6 flex flex-col justify-between space-y-6 hover:border-white/30 transition-all group"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                      {mockup.category}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-neutral-100">
                    {mockup.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {mockup.description}
                  </p>
                </div>

                {/* Abstract Interactive Architectural Frame */}
                <div className="w-full h-48 rounded-xl bg-black border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase">
                      {mockup.type}
                    </span>
                  </div>

                  {/* Mockup Elements Representation */}
                  <div className="space-y-2">
                    {mockup.mockupElements.map((el, i) => (
                      <div
                        key={el}
                        className="px-3 py-1.5 rounded bg-neutral-900/90 border border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-300"
                      >
                        <span>{el}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mockup.color }} />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-neutral-600 pt-1">
                    <span>SYS.VIEWPORT</span>
                    <span>100% SCALE</span>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>DESIGNED IN FIGMA</span>
                  <span className="text-white font-bold">READY SPEC</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
