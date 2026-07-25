import React from 'react';

// Image 1: Heavily soiled, dusty solar panel grid with bird droppings and dirt patches (Before)
export const SolarPanelBeforeImage: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={`${className} object-cover bg-[#1e2025]`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Panel base gradient (dark dusty grey/black) */}
        <linearGradient id="beforePanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22252a" />
          <stop offset="50%" stopColor="#1a1c20" />
          <stop offset="100%" stopColor="#141518" />
        </linearGradient>

        {/* Silver frame gradient */}
        <linearGradient id="silverFrame" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d1d5db" />
          <stop offset="50%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>

        {/* Overall heavy soil dust overlay */}
        <linearGradient id="heavySoilDust" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#854d0e" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#a16207" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#713f12" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#582e0c" stopOpacity="0.8" />
        </linearGradient>

        {/* Pattern for solar cells */}
        <pattern id="solarCellPatternBefore" width="50" height="70" patternUnits="userSpaceOnUse">
          <rect width="48" height="68" fill="#1f2227" rx="1" />
          {/* Cell busbars */}
          <line x1="12" y1="0" x2="12" y2="70" stroke="#4b5563" strokeWidth="1" />
          <line x1="24" y1="0" x2="24" y2="70" stroke="#4b5563" strokeWidth="1" />
          <line x1="36" y1="0" x2="36" y2="70" stroke="#4b5563" strokeWidth="1" />
          {/* Fine finger grid lines */}
          <line x1="0" y1="14" x2="48" y2="14" stroke="#374151" strokeWidth="0.5" />
          <line x1="0" y1="28" x2="48" y2="28" stroke="#374151" strokeWidth="0.5" />
          <line x1="0" y1="42" x2="48" y2="42" stroke="#374151" strokeWidth="0.5" />
          <line x1="0" y1="56" x2="48" y2="56" stroke="#374151" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Camera angle & perspective transformation matching the user's photo */}
      <g transform="translate(500, 480) scale(1.25) rotate(-28) skewX(24) translate(-500, -480)">
        {/* Background Panel Base */}
        <rect x="-300" y="-300" width="1600" height="1600" fill="url(#beforePanelGrad)" />

        {/* Solar Cell Grid */}
        <rect x="-300" y="-300" width="1600" height="1600" fill="url(#solarCellPatternBefore)" />

        {/* Silver Aluminum Array Frame Grid */}
        {/* Vertical Silver Frames */}
        <rect x="-100" y="-300" width="22" height="1600" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />
        <rect x="220" y="-300" width="24" height="1600" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />
        <rect x="540" y="-300" width="24" height="1600" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />
        <rect x="860" y="-300" width="24" height="1600" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />

        {/* Horizontal Silver Frames */}
        <rect x="-300" y="50" width="1600" height="22" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />
        <rect x="-300" y="420" width="1600" height="24" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />
        <rect x="-300" y="790" width="1600" height="24" fill="url(#silverFrame)" stroke="#4b5563" strokeWidth="1" />

        {/* Global Heavy Soil & Mud Layer Overlay */}
        <rect x="-300" y="-300" width="1600" height="1600" fill="url(#heavySoilDust)" style={{ mixBlendMode: 'multiply' }} />

        {/* Brown Dirt Patches & Mud Stains */}
        <path d="M 0 100 Q 120 40 200 150 T 350 220 Q 220 380 80 300 Z" fill="#713f12" opacity="0.75" />
        <path d="M 280 200 Q 400 150 500 280 T 580 480 Q 420 500 320 360 Z" fill="#854d0e" opacity="0.8" />
        <path d="M 30 450 Q 180 400 250 550 T 140 720 Q 10 680 20 520 Z" fill="#a16207" opacity="0.7" />
        <path d="M 380 480 Q 520 440 620 580 T 480 800 Q 340 740 360 600 Z" fill="#582e0c" opacity="0.85" />
        <path d="M 600 100 Q 750 80 820 220 T 700 400 Q 580 340 600 200 Z" fill="#713f12" opacity="0.75" />

        {/* Real White Bird Droppings Crusts & Splatters (Matching User Photo) */}
        {/* Dropping Cluster 1 (Top Center) */}
        <g transform="translate(380, 260)">
          <path d="M -25 -15 C -10 -30, 20 -25, 30 -10 C 40 10, 25 35, 0 30 C -20 25, -35 0, -25 -15 Z" fill="#e2e8f0" opacity="0.95" />
          <path d="M -15 -8 C -5 -20, 12 -15, 20 -5 C 28 10, 15 25, -3 20 C -15 18, -22 2, -15 -8 Z" fill="#ffffff" />
          <circle cx="28" cy="18" r="5" fill="#ffffff" opacity="0.9" />
          <circle cx="-20" cy="22" r="4" fill="#ffffff" opacity="0.85" />
          <path d="M 10 25 Q 25 45 35 55 Q 20 48 5 30" fill="#f8fafc" opacity="0.9" />
        </g>

        {/* Dropping Cluster 2 (Center Main Large Crust) */}
        <g transform="translate(520, 560)">
          <path d="M -40 -20 C -20 -45, 30 -35, 45 -10 C 60 20, 30 50, -10 45 C -45 40, -55 10, -40 -20 Z" fill="#cbd5e1" opacity="0.95" />
          <path d="M -28 -10 C -12 -30, 22 -22, 32 -5 C 42 15, 20 38, -5 32 C -30 28, -38 5, -28 -10 Z" fill="#ffffff" />
          <path d="M 15 -25 Q 35 -40 45 -25 Q 28 -10 10 -15" fill="#ffffff" opacity="0.9" />
          <circle cx="-35" cy="25" r="7" fill="#ffffff" opacity="0.9" />
          <circle cx="-48" cy="38" r="4" fill="#f1f5f9" opacity="0.8" />
          <circle cx="42" cy="30" r="6" fill="#ffffff" opacity="0.85" />
        </g>

        {/* Dropping Cluster 3 (Bottom Left) */}
        <g transform="translate(120, 620)">
          <path d="M -20 -10 C -5 -25, 18 -20, 22 -5 C 28 15, 10 30, -12 25 C -25 20, -30 5, -20 -10 Z" fill="#e2e8f0" opacity="0.9" />
          <path d="M -12 -5 C -2 -15, 12 -12, 15 -2 C 20 10, 8 20, -6 18 C -16 15, -18 2, -12 -5 Z" fill="#ffffff" />
          <circle cx="-25" cy="18" r="5" fill="#ffffff" opacity="0.85" />
          <circle cx="20" cy="-15" r="4" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Dropping Cluster 4 (Top Left) */}
        <g transform="translate(80, 220)">
          <ellipse cx="0" cy="0" rx="18" ry="12" fill="#ffffff" opacity="0.95" />
          <circle cx="-12" cy="10" r="5" fill="#ffffff" opacity="0.9" />
          <circle cx="15" cy="-8" r="4" fill="#ffffff" opacity="0.85" />
        </g>

        {/* Dropping Cluster 5 (Right Side Panel) */}
        <g transform="translate(740, 360)">
          <path d="M -18 -12 C -5 -22, 20 -18, 25 -2 C 30 18, 12 28, -8 22 C -22 18, -25 2, -18 -12 Z" fill="#f8fafc" opacity="0.95" />
          <circle cx="22" cy="18" r="5" fill="#ffffff" opacity="0.9" />
        </g>
      </g>
    </svg>
  );
};

// Image 2: Pristine, clean, gleaming deep navy blue solar panel grid (After)
export const SolarPanelAfterImage: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={`${className} object-cover bg-[#031533]`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep blue silicon panel gradient */}
        <linearGradient id="afterPanelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0b387a" />
          <stop offset="50%" stopColor="#062252" />
          <stop offset="100%" stopColor="#02112b" />
        </linearGradient>

        {/* Clean Glass Gloss Reflection */}
        <linearGradient id="glassGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
        </linearGradient>

        {/* Silver frame gradient */}
        <linearGradient id="silverFrameClean" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>

        {/* High contrast clean solar cell pattern */}
        <pattern id="cellGridAfter" width="50" height="70" patternUnits="userSpaceOnUse">
          <rect width="48" height="68" fill="#072b63" rx="1.5" stroke="#0e4391" strokeWidth="0.5" />
          {/* Main vertical busbars - bright metallic silver */}
          <line x1="12" y1="0" x2="12" y2="70" stroke="#e0f2fe" strokeWidth="1.2" />
          <line x1="24" y1="0" x2="24" y2="70" stroke="#e0f2fe" strokeWidth="1.2" />
          <line x1="36" y1="0" x2="36" y2="70" stroke="#e0f2fe" strokeWidth="1.2" />
          {/* Horizontal fingers - fine white lines */}
          <line x1="0" y1="14" x2="48" y2="14" stroke="#7dd3fc" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="28" x2="48" y2="28" stroke="#7dd3fc" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="42" x2="48" y2="42" stroke="#7dd3fc" strokeWidth="0.6" opacity="0.8" />
          <line x1="0" y1="56" x2="48" y2="56" stroke="#7dd3fc" strokeWidth="0.6" opacity="0.8" />
        </pattern>
      </defs>

      {/* Camera angle & perspective transformation matching Before image exactly */}
      <g transform="translate(500, 480) scale(1.25) rotate(-28) skewX(24) translate(-500, -480)">
        {/* Background panel area */}
        <rect x="-300" y="-300" width="1600" height="1600" fill="url(#afterPanelGrad)" />

        {/* Solar Cell Grid */}
        <rect x="-300" y="-300" width="1600" height="1600" fill="url(#cellGridAfter)" />

        {/* Silver Aluminum Array Frame Grid */}
        {/* Vertical Silver Frames */}
        <rect x="-100" y="-300" width="22" height="1600" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />
        <rect x="220" y="-300" width="24" height="1600" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />
        <rect x="540" y="-300" width="24" height="1600" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />
        <rect x="860" y="-300" width="24" height="1600" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />

        {/* Horizontal Silver Frames */}
        <rect x="-300" y="50" width="1600" height="22" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />
        <rect x="-300" y="420" width="1600" height="24" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />
        <rect x="-300" y="790" width="1600" height="24" fill="url(#silverFrameClean)" stroke="#9ca3af" strokeWidth="1" />

        {/* Clean Glass Gloss Diagonal Sheen Reflection */}
        <rect x="-300" y="-300" width="1600" height="1600" fill="url(#glassGloss)" />
      </g>
    </svg>
  );
};
