import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-4/3 flex items-center justify-center p-4">
      {/* Soft background aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/40 via-sky-200/30 to-indigo-200/20 rounded-3xl blur-2xl transform scale-95" />
      
      {/* Decorative floating rings */}
      <div className="absolute top-4 left-6 w-16 h-16 rounded-full border-2 border-cyan-300/40 animate-pulse" />
      <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full border border-sky-300/30" />

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="50%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>

          <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="mountainFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Outer Circular Frame */}
        <circle cx="250" cy="200" r="180" fill="url(#skyGrad)" opacity="0.95" />
        <circle cx="250" cy="200" r="179" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />

        {/* Soft Sun/Glow */}
        <circle cx="250" cy="130" r="45" fill="#ffffff" opacity="0.9" />
        <circle cx="250" cy="130" r="60" fill="#bae6fd" opacity="0.4" />

        {/* Distant Mountains */}
        <path
          d="M100 280 Q170 180 240 250 T380 230 L400 320 L100 320 Z"
          fill="url(#mountainBack)"
        />
        <path
          d="M70 310 Q160 210 260 270 T430 250 L430 350 L70 350 Z"
          fill="url(#mountainFront)"
          opacity="0.9"
        />

        {/* Calm Water Reflection Base */}
        <ellipse cx="250" cy="330" rx="140" ry="25" fill="#e0f2fe" opacity="0.8" />
        <ellipse cx="250" cy="330" rx="110" ry="15" fill="#38bdf8" opacity="0.3" />

        {/* Glowing Meditation Energy Aura */}
        <circle cx="250" cy="235" r="70" fill="url(#auraGrad)" className="animate-pulse" />
        <circle cx="250" cy="235" r="50" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />

        {/* Meditating Person Silhouette */}
        <g transform="translate(250, 235)">
          {/* Head */}
          <circle cx="0" cy="-35" r="14" fill="#0f172a" />
          
          {/* Soft Hair/Bun */}
          <circle cx="0" cy="-47" r="6" fill="#1e293b" />

          {/* Neck & Shoulders */}
          <path d="M-6 -21 C-6 -18 6 -18 6 -21 L10 -10 L-10 -10 Z" fill="#0f172a" />

          {/* Body/Torso */}
          <path
            d="M-18 -10 C-22 5 -25 20 -28 30 C-10 32 10 32 28 30 C25 20 22 5 18 -10 Z"
            fill="#0f172a"
          />

          {/* Crossed Legs Base */}
          <path
            d="M-38 28 C-35 15 -20 20 -10 26 C0 22 10 22 20 26 C30 20 45 15 48 28 C35 38 -35 38 -38 28 Z"
            fill="#1e293b"
          />

          {/* Resting Arms */}
          <path
            d="M-18 -8 C-28 5 -32 18 -26 24 C-22 24 -18 18 -14 8 Z"
            fill="#1e293b"
          />
          <path
            d="M18 -8 C28 5 32 18 26 24 C22 24 18 18 14 8 Z"
            fill="#1e293b"
          />

          {/* Hands holding gentle lotus gesture */}
          <ellipse cx="0" cy="20" rx="6" ry="4" fill="#38bdf8" />
        </g>

        {/* Decorative Floating Leaves/Botanicals */}
        <path
          d="M90 220 Q110 200 130 220 Q110 240 90 220 Z"
          fill="url(#leafGrad)"
          transform="rotate(-20 110 220)"
        />
        <path
          d="M370 200 Q390 180 410 200 Q390 220 370 200 Z"
          fill="url(#leafGrad)"
          transform="rotate(25 390 200)"
        />
        <path
          d="M120 160 Q135 145 150 160 Q135 175 120 160 Z"
          fill="#38bdf8"
          opacity="0.8"
        />

        {/* Soft Sparkles/Stars */}
        <circle cx="180" cy="120" r="3" fill="#ffffff" />
        <circle cx="320" cy="110" r="4" fill="#ffffff" />
        <circle cx="350" cy="150" r="2" fill="#ffffff" />
        <circle cx="150" cy="170" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  );
};
