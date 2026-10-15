import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface DemoNoticeBannerProps {
  onOpenProposal: () => void;
}

export const DemoNoticeBanner: React.FC<DemoNoticeBannerProps> = ({ onOpenProposal }) => {
  return (
    <div className="bg-[#1B4931] text-[#FAF7F2] text-xs px-3 py-1.5 border-b border-[#246242] flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 truncate">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F3B433] shrink-0" />
        <span className="font-semibold text-[#F3B433] uppercase tracking-wider text-[10px]">
          Demo Interactiva
        </span>
        <span className="hidden sm:inline text-white/70">·</span>
        <span className="truncate text-white/90 text-[11px]">
          Propuesta comercial para Pastas To Go (sin pagos ni pedidos reales)
        </span>
      </div>

      <button
        onClick={onOpenProposal}
        className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] transition-colors cursor-pointer"
        title="Ver detalles de la propuesta comercial para el restaurante"
      >
        <Sparkles className="w-3 h-3 text-[#F3B433]" />
        <span className="hidden xs:inline">Propuesta</span>
      </button>
    </div>
  );
};
