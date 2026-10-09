import React from 'react';

/**
 * Authentic W | P monogram from the uploaded WAFULA ADVOCATES LOGO.svg
 * Precision vectors from the official Adobe Illustrator source
 */
export const WafulaLogoMonogram: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 32, color }) => {
  return (
    <svg
      viewBox="28 31 96 90"
      width={size}
      height={size}
      className={`shrink-0 transition-transform duration-200 ${className}`}
      fill={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g>
        {/* W Letterform */}
        <polygon points="67.28 84.09 61.66 64.64 57.89 64.64 52.24 84.09 47 64.64 42.71 64.64 49.49 89.53 54.47 89.53 59.77 71.3 65.04 89.53 69.77 89.53 76.53 64.64 72.5 64.64 67.28 84.09" />
        {/* P Letterform */}
        <path d="M101.02,65.34h-9.17v24.88h4.09v-8.53h5.08c2.35,0,4.31-.79,5.88-2.36,1.58-1.58,2.36-3.51,2.36-5.81s-.79-4.27-2.36-5.83c-1.58-1.56-3.54-2.35-5.88-2.35ZM104,76.63c-.78.82-1.78,1.23-2.99,1.23h-5.08v-8.67h5.08c1.21,0,2.2.41,2.99,1.23.78.82,1.17,1.85,1.17,3.11s-.39,2.29-1.17,3.11Z" />
        {/* Central Divider */}
        <rect x="80.77" y="46.55" width="2.41" height="59.8" />
        {/* Geometric Framing Box */}
        <polygon points="121.11 118.23 121.11 116.94 33.27 116.94 33.27 35.96 119.79 35.96 119.79 118.23 121.11 118.23 121.11 116.94 121.11 118.23 122.43 118.23 122.43 33.38 30.63 33.38 30.63 119.52 122.43 119.52 122.43 118.23 121.11 118.23" />
      </g>
    </svg>
  );
};

export const JusticeLogo: React.FC<{
  className?: string;
  size?: number;
  darkText?: boolean;
  showTagline?: boolean;
  monogramColor?: string;
  hideTextOnMobile?: boolean;
}> = ({
  className = '',
  size = 32,
  darkText = false,
  showTagline = false,
  monogramColor,
  hideTextOnMobile = false,
}) => {
  const chosenColor = monogramColor || (darkText ? '#183f6e' : '#ddf0ec');

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official W | P monogram from uploaded SVG */}
      <div className="relative shrink-0 flex items-center justify-center">
        <WafulaLogoMonogram size={size} color={chosenColor} />
      </div>

      <div
        className={`flex flex-col justify-center leading-none ${
          hideTextOnMobile ? 'hidden lg:flex' : ''
        }`}
      >
        <div className="flex items-center">
          <span
            className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight font-sans whitespace-nowrap ${
              darkText ? 'text-[#0a111a]' : 'text-white'
            }`}
          >
            WAFULA PW &amp; CO. ADVOCATES
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[10px] sm:text-[11px] tracking-wider uppercase mt-1 font-medium ${
              darkText ? 'text-slate-500' : 'text-slate-300'
            }`}
          >
            Your Trusted Legal Partner
          </span>
        ) : null}
      </div>
    </div>
  );
};

export const GoldStar: React.FC<{ className?: string }> = ({ className = 'w-3 h-3 text-[#ddf0ec]' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);


