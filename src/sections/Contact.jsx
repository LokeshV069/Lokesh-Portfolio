import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { Send, Terminal, Mail, Check, Copy, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { audioEngine } from '../utils/audioEngine';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'ready' | null
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = 'lokesh.valmeeki@gmail.com';

  const handleCopyEmail = () => {
    audioEngine.playClickChime();
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audioEngine.playHoverTone();
    setIsSubmitting(true);

    // Provide authentic direct mail client transmission without pretending a fake backend
    setTimeout(() => {
      setIsSubmitting(false);
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      // Trigger client mailto dispatch
      window.location.href = `mailto:${directEmail}?subject=${subject}&body=${body}`;
      setSubmissionStatus('ready');
      audioEngine.playClickChime();
    }, 900);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden"
      aria-label="Direct Transmission and Contact"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-2">
          <SectionLabel label="// DIRECT TRANSMISSION" status="CHANNEL READY" accent="cyan" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            LET'S BUILD
            <br />
            SOMETHING.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl pt-2">
            Available for software engineering roles, XR spatial development, AI & RAG system architecture, and technical collaborations.
          </p>
        </div>

        {/* Contact Layout: Left Terminal HUD, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Terminal-Inspired HUD Panel */}
          <div className="lg:col-span-5 bg-neutral-950 rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent-cyan" />
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  COMMUNICATION LINK
                </span>
              </div>
              <span className="font-mono text-[10px] text-accent-lime font-bold">
                ● ONLINE
              </span>
            </div>

            {/* Terminal Output Stream */}
            <div className="font-mono text-xs text-neutral-400 space-y-2 bg-black/70 p-4 rounded-xl border border-white/5">
              <p className="text-neutral-500">&gt; INITIALIZING CONNECTION PROTOCOL...</p>
              <p className="text-neutral-300">&gt; CHANNEL: DIRECT_PEER_TRANSMISSION</p>
              <p className="text-neutral-300">&gt; ROUTING: COIMBATORE, TN (UTC +5:30)</p>
              <p className="text-accent-cyan">&gt; TARGET: LOKESH V [CS & DESIGN]</p>
              <p className="text-neutral-500">&gt; STATUS: AWAITING INPUT STREAM</p>
            </div>

            {/* Direct Email Card with One-Click Copy */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
                DIRECT INBOX
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm text-white font-medium truncate">
                  {directEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => audioEngine.playHoverTone()}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Social Links Fast Dispatches */}
            <div className="pt-2 space-y-3">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block">
                EXTERNAL NETWORKS
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/lokeshv-dev"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group font-mono text-xs text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    <span>GITHUB</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-accent-cyan transition-colors" />
                </a>

                <a
                  href="https://linkedin.com/in/lokesh-valmeeki"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="external"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group font-mono text-xs text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LINKEDIN</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-accent-cyan transition-colors" />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: Transmission Input Form */}
          <div className="lg:col-span-7 bg-neutral-950 rounded-3xl border border-white/15 p-6 sm:p-10 space-y-6">
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span>TRANSMISSION CONSOLE</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                  YOUR NAME // IDENTITY
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-accent-cyan font-mono text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                  RETURN ADDRESS // EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-accent-cyan font-mono text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                  TRANSMISSION PAYLOAD // MESSAGE
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Discuss an XR project, engineering opportunity, or AI RAG system..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-accent-cyan font-mono text-sm transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  icon={Send}
                  className="w-full sm:w-auto shadow-glow-white"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE →'}
                </Button>
              </div>

              {submissionStatus === 'ready' && (
                <div className="p-4 rounded-xl bg-accent-lime/10 border border-accent-lime/30 text-accent-lime font-mono text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>
                    DISPATCH INITIALIZED // Your mail client has opened with your message payload. Alternatively, email directly at {directEmail}.
                  </span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
