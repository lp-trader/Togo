import React, { useState } from 'react';
import { Menu, ShoppingCart, X, Sparkles, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenProposal: () => void;
  onOpenWhatsApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProposal, onOpenWhatsApp }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md px-4 sm:px-6 py-2 transition-shadow">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          
          {/* Left: Hamburger menu icon */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            className="w-10 h-10 flex items-center justify-center text-[#164228] hover:bg-[#EAE2D5]/50 rounded-xl transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Center: Official Pastas to go logo */}
          <div className="flex items-center justify-center py-1">
            <BrandLogo size="md" />
          </div>

          {/* Right: Cart icon with red counter badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito (${totalItemsCount} platos)`}
            className="relative w-10 h-10 flex items-center justify-center text-[#164228] hover:bg-[#EAE2D5]/50 rounded-xl transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6 stroke-[2]" />
            {totalItemsCount > 0 && (
              <span className="absolute 0 top-1 -right-0.5 bg-[#E14936] text-white text-[11px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-150">
                {totalItemsCount}
              </span>
            )}
          </button>

        </div>
      </header>

      {/* Hamburger Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-start animate-in fade-in duration-200">
          <div
            className="w-72 max-w-[80vw] bg-[#FAF7F2] h-full shadow-2xl p-5 flex flex-col justify-between border-r border-[#EAE3D6] animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#EAE2D5] flex items-center justify-center text-[#164228] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-3 text-sm font-semibold text-[#164228]">
                <a
                  href="#menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl hover:bg-white transition-colors"
                >
                  Nuestros Favoritos
                </a>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white transition-colors flex items-center justify-between"
                >
                  <span>Tu Pedido</span>
                  {totalItemsCount > 0 && (
                    <span className="bg-[#E14936] text-white text-xs px-2 py-0.5 rounded-full">
                      {totalItemsCount}
                    </span>
                  )}
                </button>
                {onOpenWhatsApp && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenWhatsApp();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white transition-colors flex items-center gap-2 text-[#25D366]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenProposal();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white transition-colors flex items-center gap-2 text-[#E14936]"
                >
                  <Sparkles className="w-4 h-4 text-[#F3B433]" />
                  <span>Propuesta Comercial</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#EAE3D6] text-center text-xs text-[#6B5E56]">
              <p className="font-semibold text-[#164228]">Pastas To Go</p>
              <p className="text-[11px] mt-0.5">Tradición en un Bowl</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
