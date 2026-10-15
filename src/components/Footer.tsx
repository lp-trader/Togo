import React from 'react';
import { BrandLogo } from './BrandLogo';
import { RESTAURANT_CONFIG } from '../data/menuData';
import { Sparkles, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onOpenProposal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProposal }) => {
  return (
    <footer className="bg-[#1B4931] text-[#FAF7F2] border-t border-[#163D29] pt-12 pb-24 md:pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#246242]">
          <div className="flex flex-col items-center sm:items-start">
            <div className="bg-white/95 p-1 rounded-2xl inline-block shadow-sm">
              <BrandLogo size="md" />
            </div>
            <p className="mt-2 text-xs text-white/70 max-w-sm">
              "{RESTAURANT_CONFIG.secondarySlogan}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenProposal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-white font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F3B433]" />
              <span>Ver Propuesta Comercial</span>
            </button>

            <a
              href={`https://instagram.com/${RESTAURANT_CONFIG.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-white font-medium transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E14936]" />
              <span>{RESTAURANT_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Disclaimer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center md:text-left">
          <p className="max-w-2xl text-[11px] leading-relaxed">
            {RESTAURANT_CONFIG.demoDisclaimer}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-white/50">
            <span>Propuesta desarrollada con</span>
            <Heart className="w-3 h-3 text-[#E14936] fill-[#E14936]" />
            <span>para Pastas To Go</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
