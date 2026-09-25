import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import { Database, Search, Cpu, Brain, GitBranch, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AISystems({ onOpenCaseStudy }) {
  const [activeNode, setActiveNode] = useState(0);

  const pipelineNodes = [
    {
      id: 'rag',
      title: 'RAG PIPELINE',
      icon: Database,
      tag: 'INGESTION',
      detail: 'Parses academic PDFs, documentation, and data feeds into semantic vector embeddings with structural chunk metadata intact.',
      system: 'ChromaDB / LangChain'
    },
    {
      id: 'retrieval',
      title: 'SEMANTIC RETRIEVAL',
      icon: Search,
      tag: 'TOP-K MATCH',
      detail: 'Executes cosine similarity and hybrid keyword retrieval to identify contextually relevant passage vectors without cloud latency.',
      system: 'Dense Vector Search'
    },
    {
      id: 'context',
      title: 'CONTEXT GROUNDING',
      icon: ShieldCheck,
      tag: 'CITATION BOUNDS',
      detail: 'Applies token window packing and section citation markers to prevent model hallucination and ensure absolute provenance.',
      system: 'Deterministic Grounding'
    },
    {
      id: 'llm',
      title: 'QUANTIZED LLM',
      icon: Brain,
      tag: 'LOCAL / CLOUD',
      detail: 'Runs local Ollama models (Llama 3 / Mistral) on-device or external API models for zero-data-leakage inference.',
      system: 'Ollama / Open Models'
    },
    {
      id: 'reasoning',
      title: 'REASONING & SYNTHESIS',
      icon: Cpu,
      tag: 'STRUCTURED OUTPUT',
      detail: 'Performs multi-step portfolio drift evaluation, cross-paper synthesis, or automated life-event consequence logic.',
      system: 'Chain-of-Thought Guardrails'
    },
    {
      id: 'output',
      title: 'ACTIONABLE OUTPUT',
      icon: Sparkles,
      tag: 'VERIFIED DISPATCH',
      detail: 'Emits audit-ready recommendations, n8n webhook notifications, or interactive UI citations directly to user.',
      system: 'React HUD / Webhooks'
    }
  ];

  const aiHighlights = [
    {
      title: 'AI Research Assistant',
      category: 'LOCAL RAG',
      desc: '100% on-device academic document interrogation with section-level citations and zero telemetry transmission.',
      tech: ['Python', 'LangChain', 'Ollama', 'ChromaDB'],
      projectId: 'ai-research-assistant'
    },
    {
      title: 'Meridian Wealth Console',
      category: 'FINANCIAL AI & n8n',
      desc: 'Automated portfolio drift surveillance and explainable rebalancing reasoning engine with Alpha Vantage feeds.',
      tech: ['React', 'n8n', 'Alpha Vantage', 'LLMs'],
      projectId: 'meridian-wealth-console'
    },
    {
      title: 'Intelligent Automation Workflows',
      category: 'EVENT-DRIVEN AGENTS',
      desc: 'Autonomous multi-step n8n webhook pipelines triggering deterministic alerts based on dynamic threshold metrics.',
      tech: ['n8n', 'Webhooks', 'REST APIs', 'Automation'],
      projectId: null
    }
  ];

  return (
    <section
      id="ai-systems"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="AI Systems and Architecture"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-2">
          <SectionLabel label="// INTELLIGENCE LAYER" status="RUNNING" accent="cyan" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            AI SYSTEMS
            <br />
            I BUILD.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl pt-2">
            Engineering deterministic, citation-aware AI pipelines. Combining local quantized language models, vector retrieval, and event-driven automation engines.
          </p>
        </div>

        {/* Interactive Architecture Node Graph */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-950 border border-white/15 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">
                INTERACTIVE PIPELINE FLOW GRAPH
              </span>
              <p className="text-xs text-neutral-500">
                Hover or click nodes to inspect operational parameters
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-accent-cyan bg-white/[0.04] px-3 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
              <span>ACTIVE FLOW: RETRIEVAL → REASONING</span>
            </div>
          </div>

          {/* Node Track */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipelineNodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = activeNode === index;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    audioEngine.playHoverTone();
                    setActiveNode(index);
                  }}
                  onMouseEnter={() => {
                    audioEngine.playHoverTone();
                    setActiveNode(index);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 relative ${
                    isSelected
                      ? 'bg-white text-black shadow-glow-white scale-105'
                      : 'bg-neutral-900/80 text-neutral-300 hover:bg-neutral-800 border border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[10px] font-bold ${isSelected ? 'text-black' : 'text-neutral-500'}`}>
                      0{index + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-accent-cyan'}`} />
                  </div>
                  <div>
                    <span className={`font-mono text-[9px] uppercase tracking-wider block ${isSelected ? 'text-neutral-700' : 'text-neutral-500'}`}>
                      {node.tag}
                    </span>
                    <h4 className="font-mono text-xs font-bold leading-tight mt-1">
                      {node.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Node Detail Inspector Banner */}
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-accent-cyan font-bold uppercase">
                  NODE SPEC // {pipelineNodes[activeNode].title}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 bg-white/5 px-2 py-0.5 rounded">
                  {pipelineNodes[activeNode].system}
                </span>
              </div>
              <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {pipelineNodes[activeNode].detail}
              </p>
            </div>

            <div className="shrink-0 font-mono text-xs text-neutral-400">
              STATUS: <span className="text-accent-lime font-bold">OPTIMIZED</span>
            </div>
          </div>
        </div>

        {/* 3 AI System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiHighlights.map((ai) => (
            <div
              key={ai.title}
              className="p-6 rounded-2xl bg-neutral-950/70 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-widest block">
                  {ai.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {ai.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {ai.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {ai.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
