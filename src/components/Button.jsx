import React from 'react';
import { audioEngine } from '../utils/audioEngine';

export default function Button({
  children,
  onClick,
  href,
  target,
  rel,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',
  icon: Icon,
  className = '',
  download,
  'aria-label': ariaLabel,
  ...props
}) {
  const handleMouseEnter = () => {
    audioEngine.playHoverTone();
  };

  const handleClick = (e) => {
    audioEngine.playClickChime();
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan disabled:opacity-50 disabled:pointer-events-none group';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-2',
    md: 'text-xs px-5 py-2.5 rounded-full gap-2.5',
    lg: 'text-sm px-7 py-3.5 rounded-full gap-3 font-semibold'
  }[size] || 'text-xs px-5 py-2.5 rounded-full gap-2.5';

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-neutral-200 border border-white shadow-sm hover:shadow-glow-white active:scale-[0.98]',
    dark:
      'bg-black text-white hover:bg-neutral-800 border border-black shadow-lg hover:shadow-glow-white active:scale-[0.98]',
    secondary:
      'bg-neutral-900/90 text-white hover:bg-neutral-800 border border-white/20 hover:border-white/40 active:scale-[0.98]',
    outline:
      'bg-transparent text-white hover:bg-white/10 border border-white/30 hover:border-white active:scale-[0.98]',
    ghost:
      'bg-transparent text-neutral-300 hover:text-white hover:bg-white/5 active:scale-[0.98]'
  }[variant] || 'bg-white text-black';

  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <Icon className="w-3.5 h-3.5" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
}
