import React from 'react';
import { audioEngine } from '../utils/audioEngine';

export default function SocialDock({ soundEnabled, setSoundEnabled }) {
  const handleToggleSound = () => {
    const newState = audioEngine.toggle();
    if (setSoundEnabled) setSoundEnabled(newState);
  };

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/lokeshv-dev',
      icon: (
        <svg
          className="w-[18px] h-[18px] stroke-current fill-none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {/* Cat Head with pointy ears */}
          <path d="M6.5 5.5 L4.2 2.5 L8.5 3.8 C9.6 3.4 10.8 3.2 12 3.2 C13.2 3.2 14.4 3.4 15.5 3.8 L19.8 2.5 L17.5 5.5 C19 7.2 19.5 9.2 19 11.2 C18.3 13.5 16.2 14.5 14.5 14.8 V20.5" />
          <path d="M9.5 14.8 C7.8 14.5 5.7 13.5 5 11.2 C4.5 9.2 5 7.2 6.5 5.5" />
          {/* Body / legs */}
          <path d="M9.5 14.8 V20.5" />
          {/* Tail curving to the left */}
          <path d="M9.5 17.5 C6.5 17.5 3.8 16 3.2 13.5 C2.8 11.8 4 10.8 4.6 12" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/lokesh-valmeeki',
      icon: (
        <svg
          className="w-[18px] h-[18px] stroke-current fill-none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {/* i dot outline */}
          <circle cx="4.5" cy="4.5" r="1.8" />
          {/* i stem */}
          <line x1="4.5" y1="9" x2="4.5" y2="19.5" />
          {/* n letter */}
          <path d="M10.5 19.5 V13 C10.5 10.6 12.3 9 14.6 9 C16.9 9 18.7 10.6 18.7 13 V19.5" />
          <line x1="10.5" y1="9" x2="10.5" y2="19.5" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg
          className="w-[18px] h-[18px] stroke-current fill-none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      name: 'Twitter / X',
      url: 'https://x.com',
      icon: (
        <svg
          className="w-[17px] h-[17px] stroke-current fill-none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      )
    }
  ];

  return (
    <aside
      className="hidden md:flex fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-auto"
      aria-label="Social Channels and Audio Controls"
    >
      {/* Charcoal Rounded Vertical Pill matching reference design */}
      <div className="w-[46px] flex flex-col items-center gap-3.5 py-4 px-1.5 rounded-full bg-[#424242]/95 backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => audioEngine.playHoverTone()}
            onClick={() => audioEngine.playClickChime()}
            data-cursor="external"
            aria-label={`Open ${item.name}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/85 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 group relative"
          >
            {item.icon}

            {/* Hover Tooltip Badge */}
            <span className="absolute right-12 px-2.5 py-1 rounded bg-black/90 border border-white/15 text-[10px] font-mono text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {item.name}
            </span>
          </a>
        ))}

        {/* Subtle Horizontal Divider Line */}
        <div className="w-5 h-[1px] bg-white/20 my-0.5" />

        {/* Speaker / Audio Toggle Button */}
        <button
          onClick={handleToggleSound}
          onMouseEnter={() => audioEngine.playHoverTone()}
          title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/85 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 group relative"
        >
          {soundEnabled ? (
            <svg
              className="w-[18px] h-[18px] stroke-current fill-none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.5 8.5 C16.8 9.8 16.8 14.2 15.5 15.5" />
              <path d="M19 5 C21.5 7.5 21.5 16.5 19 19" />
            </svg>
          ) : (
            <svg
              className="w-[18px] h-[18px] stroke-current fill-none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          )}

          {/* Hover Tooltip Badge */}
          <span className="absolute right-12 px-2.5 py-1 rounded bg-black/90 border border-white/15 text-[10px] font-mono text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}
          </span>
        </button>
      </div>
    </aside>
  );
}
