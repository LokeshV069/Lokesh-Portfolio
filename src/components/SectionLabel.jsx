import React from 'react';

export default function SectionLabel({ label, status = 'ACTIVE', accent = 'cyan' }) {
  const accentDot = accent === 'cyan' ? 'bg-accent-cyan' : accent === 'lime' ? 'bg-accent-lime' : 'bg-white';

  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-3">
      <span className={`w-1.5 h-1.5 rounded-full ${accentDot} animate-pulse`} />
      <span className="font-mono text-[11px] font-medium tracking-widest text-[#AAAAAA] uppercase">
        {label}
      </span>
      {status && (
        <span className="font-mono text-[9px] text-[#666666] tracking-wider border-l border-white/10 pl-2">
          {status}
        </span>
      )}
    </div>
  );
}
