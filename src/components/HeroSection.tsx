import React from 'react';
import { RESTAURANT_CONFIG } from '../data/menuData';

interface HeroSectionProps {
  onOpenWhatsApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWhatsApp }) => {
  return (
    <section className="relative pt-2 pb-3 px-4 max-w-2xl mx-auto text-center overflow-hidden">
      
      {/* Decorative Basil Sprig on Top-Left */}
      <div className="absolute -top-1 left-1 sm:left-4 pointer-events-none opacity-90 select-none">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Leaf */}
          <path
            d="M12 40 C10 24 28 10 44 14 C48 28 34 46 16 46 Z"
            fill="#4F8A38"
          />
          <path
            d="M16 44 C26 34 34 26 42 16"
            stroke="#68A84E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Secondary small leaf */}
          <path
            d="M8 26 C4 16 16 8 28 12 C30 22 20 30 10 30 Z"
            fill="#5E9E42"
          />
        </svg>
      </div>

      {/* Decorative Penne Pasta on Top-Right */}
      <div className="absolute -top-1 right-1 sm:right-4 pointer-events-none opacity-90 select-none">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Penne tube 1 */}
          <g transform="rotate(25 35 25)">
            <path
              d="M16 18 L46 26 L42 34 L12 26 Z"
              fill="#E8B458"
              stroke="#D19838"
              strokeWidth="1"
            />
            {/* Ridges */}
            <line x1="22" y1="20" x2="18" y2="28" stroke="#D19838" strokeWidth="1" />
            <line x1="30" y1="22" x2="26" y2="30" stroke="#D19838" strokeWidth="1" />
            <line x1="38" y1="24" x2="34" y2="32" stroke="#D19838" strokeWidth="1" />
          </g>
          {/* Small leaf */}
          <circle cx="52" cy="40" r="3" fill="#4F8A38" />
        </svg>
      </div>

      {/* Main Slogan with golden sunbeam accents on both sides: ✨ Tradición en un Bowl ✨ */}
      <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3">
        {/* Left radiating sunbeams */}
        <div className="flex items-center gap-0.5">
          <span className="w-1 h-2.5 rounded-full bg-[#F4B333] transform -rotate-45" />
          <span className="w-1.5 h-3.5 rounded-full bg-[#F4B333]" />
          <span className="w-1 h-2.5 rounded-full bg-[#F4B333] transform rotate-45" />
        </div>

        <h1 className="font-brand-display text-2xl sm:text-3xl font-extrabold text-[#164228] tracking-tight">
          Tradición en un <span className="italic font-serif font-bold text-[#164228]">Bowl</span>
        </h1>

        {/* Right radiating sunbeams */}
        <div className="flex items-center gap-0.5">
          <span className="w-1 h-2.5 rounded-full bg-[#F4B333] transform -rotate-45" />
          <span className="w-1.5 h-3.5 rounded-full bg-[#F4B333]" />
          <span className="w-1 h-2.5 rounded-full bg-[#F4B333] transform rotate-45" />
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-1 text-xs sm:text-sm font-medium text-[#164228] tracking-wide">
        {RESTAURANT_CONFIG.secondarySlogan}
      </p>

    </section>
  );
};
