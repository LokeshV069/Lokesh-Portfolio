import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import Button from './Button';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        audioEngine.playModalClose();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    audioEngine.playClickChime();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl overflow-y-auto flex flex-col items-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Lokesh V Curriculum Vitae"
    >
      {/* Floating Control Bar */}
      <div className="sticky top-4 z-20 flex items-center justify-between w-full max-w-4xl py-2.5 px-6 rounded-full bg-neutral-900/90 border border-white/20 backdrop-blur-xl shadow-2xl mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            LOKESH V // CURRICULUM VITAE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            onMouseEnter={() => audioEngine.playHoverTone()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / SAVE PDF</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playModalClose();
              onClose();
            }}
            aria-label="Close Resume"
            className="p-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resume Document Canvas */}
      <div className="w-full max-w-4xl bg-[#0F0F0F] text-[#F0F0F0] rounded-3xl border border-white/20 p-8 sm:p-12 lg:p-16 shadow-2xl space-y-10">

        {/* Header Block */}
        <header className="border-b border-white/15 pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                LOKESH V
              </h1>
              <p className="text-base text-neutral-300 font-medium pt-1">
                Software Engineer | XR Developer | AI / RAG Developer | UI/UX Designer
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-400 space-y-1 sm:text-right">
              <div>lokesh.valmeeki@gmail.com</div>
              <div>Coimbatore, Tamil Nadu, India</div>
              <div>github.com/lokeshv-dev</div>
            </div>
          </div>
        </header>

        {/* Education Section */}
        <section className="space-y-3">
          <h2 className="font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
            01 // EDUCATION
          </h2>
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                Bachelor of Engineering in Computer Science and Design
              </h3>
              <p className="text-xs text-neutral-400">
                SNS College of Engineering (Autonomous, Affiliated to Anna University)
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-400 shrink-0">
              2023 – 2027
            </span>
          </div>
        </section>

        {/* Core Areas Section */}
        <section className="space-y-3">
          <h2 className="font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
            02 // TECHNICAL ARSENAL
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
                XR & SPATIAL COMPUTING
              </span>
              <p className="text-neutral-200">
                Unity, Vuforia, OpenXR, 6DoF Hand Tracking, Spatial UI, 3D Interaction Physics
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
                AI & AUTOMATION
              </span>
              <p className="text-neutral-200">
                Python, LangChain, ChromaDB Vector Stores, Ollama Local Models, n8n Automation
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
                WEB ENGINEERING
              </span>
              <p className="text-neutral-200">
                React, JavaScript ES6+, HTML5 / CSS3, Tailwind CSS, REST APIs
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
                UI/UX & DESIGN
              </span>
              <p className="text-neutral-200">
                Figma, Design Systems, Auto Layout, High-Fidelity Prototyping
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
            03 // KEY ARCHITECTURAL PROJECTS
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Meridian Wealth Console</h3>
                <span className="font-mono text-[10px] text-neutral-500">2026 // AI & AUTOMATION</span>
              </div>
              <p className="text-neutral-300">
                AI-assisted wealth management platform to analyze client portfolios, identify portfolio drift, evaluate risk, and synthesize explainable rebalancing recommendations via n8n and Alpha Vantage feeds.
              </p>
              <div className="font-mono text-[10px] text-accent-cyan pt-1">
                Stack: React, AI / LLM, n8n, Alpha Vantage, Tailwind CSS
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">AI Research Assistant</h3>
                <span className="font-mono text-[10px] text-neutral-500">2026 // AI & RAG</span>
              </div>
              <p className="text-neutral-300">
                Local RAG research platform enabling document ingestion, dense vector embedding, semantic retrieval, and local Ollama inference with section-level citation provenance and zero cloud leakage.
              </p>
              <div className="font-mono text-[10px] text-accent-cyan pt-1">
                Stack: Python, LangChain, Ollama, ChromaDB, Streamlit
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">HoloGesture</h3>
                <span className="font-mono text-[10px] text-neutral-500">2025–2026 // XR & AR</span>
              </div>
              <p className="text-neutral-300">
                Interactive spatial computing application for hand-gesture-based manipulation of 3D virtual objects utilizing 6DoF skeletal landmarks and physics triggers in Unity.
              </p>
              <div className="font-mono text-[10px] text-accent-cyan pt-1">
                Stack: Unity, C#, OpenXR, Hand Tracking, 3D Interaction
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Spatial Commerce AR & ChemVerse AR</h3>
                <span className="font-mono text-[10px] text-neutral-500">2025 // AR & 3D</span>
              </div>
              <p className="text-neutral-300">
                Ground-plane 3D product visualizer in real scale and interactive educational augmented reality tool for spatial molecular structure dissection.
              </p>
              <div className="font-mono text-[10px] text-accent-cyan pt-1">
                Stack: Unity, Vuforia, C#, PBR Shading
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <h2 className="font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
            04 // PROFESSIONAL EXPERIENCE & INVOLVEMENT
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">UI/UX Design Intern — LANDO</h3>
                <span className="font-mono text-[10px] text-neutral-500">June 2026 – July 2026</span>
              </div>
              <p className="text-neutral-300">
                Designed comprehensive design systems, component libraries, auto-layout hierarchies, and interactive responsive prototypes in Figma.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Web & Software Intern — Internpe</h3>
                <span className="font-mono text-[10px] text-neutral-500">2025 – 2026</span>
              </div>
              <p className="text-neutral-300">
                Developed responsive web applications, modular React UI components, and state validation workflows.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Team Lead & Architect — Smart India Hackathon (Team HackSmiths)</h3>
                <span className="font-mono text-[10px] text-neutral-500">2025</span>
              </div>
              <p className="text-neutral-300">
                Led technical architecture for an autonomous agricultural precision rover integrating sensors and computer vision.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="space-y-3">
          <h2 className="font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
            05 // VERIFIED CERTIFICATIONS
          </h2>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">Databricks — Generative AI Fundamentals</div>
              <div className="text-neutral-400 font-mono text-[10px]">Credential: DATABRICKS-GENAI-FUNDAMENTALS</div>
            </div>
            <span className="font-mono text-xs text-neutral-400">2024</span>
          </div>
        </section>

      </div>
    </div>
  );
}
