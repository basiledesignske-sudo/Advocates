import React from 'react';

interface JusticeLogoProps {
  size?: number;
  darkText?: boolean;
  hideTextOnMobile?: boolean;
  className?: string;
}

export const JusticeLogo: React.FC<JusticeLogoProps> = ({
  size = 32,
  darkText = false,
  hideTextOnMobile = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Monogram / Scales Emblem */}
      <WafulaLogoMonogram size={size} color={darkText ? '#183f6e' : '#ddf0ec'} />

      {/* Brand Typographic Wordmark */}
      <div className={`flex flex-col ${hideTextOnMobile ? 'hidden sm:flex' : 'flex'}`}>
        <span
          className={`font-serif tracking-widest uppercase font-extrabold text-sm sm:text-base leading-none ${
            darkText ? 'text-[#0a111a]' : 'text-white'
          }`}
          style={{ letterSpacing: '0.14em' }}
        >
          WAFULA PW
        </span>
        <span
          className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
            darkText ? 'text-slate-600' : 'text-[#ddf0ec]'
          }`}
          style={{ letterSpacing: '0.22em' }}
        >
          &amp; CO. ADVOCATES
        </span>
      </div>
    </div>
  );
};

interface WafulaLogoMonogramProps {
  size?: number;
  color?: string;
  className?: string;
}

export const WafulaLogoMonogram: React.FC<WafulaLogoMonogramProps> = ({
  size = 32,
  color = '#ddf0ec',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="20" cy="20" r="16.5" fill={color} fillOpacity="0.12" />
      {/* Pillar & Scales of Justice Graphic */}
      <path
        d="M20 7V33M12 13H28M12 13L9 20H15L12 13ZM28 13L25 20H31L28 13ZM16 33H24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GoldStar: React.FC<{ className?: string }> = ({ className = 'w-3 h-3 text-[#183f6e]' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};
