/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0d0d0d',
        'surface-elevated': '#161616',
        'surface-border': '#242424',
        'surface-border-subtle': '#181818',
        'accent-cyan': '#00F0FF',
        'accent-violet': '#8B5CF6',
        'accent-lime': '#10B981',
        'accent-crimson': '#F43F5E',
        'accent-blue': '#3B82F6',
        'text-muted': '#888888',
        'text-dim': '#555555',
        'text-secondary': '#A0A0A0',
        'text-primary': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        'ultra-wide': '.3em',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.25)',
        'glow-white': '0 0 30px -5px rgba(255, 255, 255, 0.15)',
        'pill': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
