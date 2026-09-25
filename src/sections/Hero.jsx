import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroScene from '../three/HeroScene';
import { audioEngine } from '../utils/audioEngine';

export default function Hero({ onOpenResume, onNavigate }) {
  const [portraitLoaded, setPortraitLoaded] = useState(false);

  // 3D Card Tilt State
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sheenX: 50, sheenY: 50 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // Card Mouse Move Handler for 3D Tilt Effect
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1

    const maxTilt = 12; // tilt angle in degrees
    setTilt({
      rx: -py * maxTilt,
      ry: px * maxTilt,
      sheenX: (x / rect.width) * 100,
      sheenY: (y / rect.height) * 100
    });
  };

  const handleCardMouseEnter = () => {
    setIsHoveringCard(true);
    audioEngine.playHoverTone();
  };

  const handleCardMouseLeave = () => {
    setIsHoveringCard(false);
    setTilt({ rx: 0, ry: 0, sheenX: 50, sheenY: 50 });
  };

  const scrollToWorks = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#projects');
    } else {
      audioEngine.playClickChime();
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#contact');
    } else {
      audioEngine.playClickChime();
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 lg:pt-0 bg-black"
      aria-label="Introduction & Hero"
    >
      {/* 3D WebGL Spatial Field Background */}
      <HeroScene />

      {/* Split Screen Layer: White Left Background with Diagonal Organic Transition */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-0 left-0 w-[55%] xl:w-[58%] bg-[#F5F5F5] text-black shadow-2xl transition-transform duration-300"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 84% 100%, 0 100%)'
          }}
        >
          {/* Subtle grid pattern inside light side */}
          <div className="absolute inset-0 bg-tech-grid opacity-15" />
          <div className="absolute top-28 left-6 sm:left-10 lg:left-14 xl:left-20 font-mono text-[10px] text-neutral-400 select-none tracking-widest">
            LAT: 11.0168° // LON: 76.9558° // SYS.NODE.ALPHA
          </div>
          <div className="absolute bottom-16 left-6 sm:left-10 lg:left-14 xl:left-20 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
            ENGINEERING × DESIGN LAB
          </div>
        </div>
      </div>

      {/* Main Content Container - Expanded & Left Aligned to Screen */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:pl-14 lg:pr-12 xl:pl-20 xl:pr-16 2xl:pl-24 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
          
          {/* LEFT SIDE: Fixed, Clean Left-Aligned Structured Typography (Moved to Left of Screen) */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center space-y-6 text-left">
            
            {/* Main Headline - Structured & Scaled for Balance */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] text-white lg:text-black select-none">
                I'M LOKESH V.
                <br />
                <span className="text-neutral-800 lg:text-neutral-900">
                  SOFTWARE DEVELOPER
                </span>
                <br />
                <span className="relative inline-block text-white lg:text-black">
                  & DESIGNER.
                  <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-black/80 rounded-full hidden lg:block" />
                </span>
              </h1>
            </div>

            {/* Subtitle - Cleanly Structured Under Headline */}
            <p className="text-sm sm:text-base text-neutral-400 lg:text-neutral-700 max-w-lg font-normal leading-relaxed">
              I develop robust software applications, interactive digital systems, intelligent automation, and intuitive user experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* 1. Realistic Black Tactile Button: EXPLORE WORKS */}
              <button
                onClick={scrollToWorks}
                onMouseEnter={() => audioEngine.playHoverTone()}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-black text-white font-mono text-xs font-bold tracking-wider uppercase border border-black/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_6px_20px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_28px_-4px_rgba(0,0,0,0.5),0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Specular Glare Shimmer sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />

                <span className="relative z-10">EXPLORE WORKS</span>
                
                {/* Micro-animated Arrow Icon */}
                <div className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </button>

              {/* 2. Realistic Satin-Finish Pill Button: CONTACT ME */}
              <button
                onClick={scrollToContact}
                onMouseEnter={() => audioEngine.playHoverTone()}
                className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full bg-neutral-200/80 lg:bg-neutral-200/90 hover:bg-white text-black font-mono text-xs font-bold tracking-wider uppercase border border-black/15 hover:border-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_24px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Soft specular sheen sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />

                <span className="relative z-10">CONTACT ME</span>
              </button>
            </div>

            {/* Bottom-left subtle technical manifesto text */}
            <div className="pt-6 border-t border-neutral-800 lg:border-neutral-300/80 max-w-lg">
              <p className="font-mono text-[10px] text-neutral-500 lg:text-neutral-600 tracking-wider uppercase">
                BUILDING AT THE INTERSECTION OF CODE × DESIGN × SPATIAL COMPUTING
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Minimalist Black & White Card with Interactive 3D Tilt Effect */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end xl:pr-6">
            
            {/* 3D Tilt Card Container */}
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${
                  isHoveringCard ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                }`,
                transition: isHoveringCard ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                transformStyle: 'preserve-3d'
              }}
              className="relative z-10 w-72 sm:w-80 md:w-[340px] rounded-2xl p-3 bg-black border border-white/20 shadow-2xl overflow-hidden group cursor-pointer"
            >
              {/* Dynamic Specular Light Reflection / Sheen following cursor */}
              {isHoveringCard && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl z-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255, 255, 255, 0.16) 0%, transparent 65%)`
                  }}
                />
              )}

              {/* High-Contrast Editorial Portrait */}
              <div className="relative aspect-[4/5] w-full rounded-xl bg-neutral-900 overflow-hidden border border-white/10">
                <img
                  src="/profile.png"
                  alt="Lokesh V — Software Developer & Designer"
                  onLoad={() => setPortraitLoaded(true)}
                  className={`w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ${
                    portraitLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                
                {/* Subtle dark vignette inside image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Simple Black & White Minimalist Card Label */}
              <div className="pt-3.5 pb-1 px-1.5 flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                    LOKESH V
                  </h3>
                  <p className="font-mono text-[10px] text-neutral-400 pt-0.5">
                    Software Developer & Designer
                  </p>
                </div>
                <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                  2026
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
