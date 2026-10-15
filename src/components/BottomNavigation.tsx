import React, { useState } from 'react';
import { Home, Utensils, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BottomNavigationProps {
  onScrollToMenu: () => void;
  onOpenProposal: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onScrollToMenu,
  onOpenProposal,
}) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'inicio' | 'menu' | 'pedido'>('inicio');

  const handleTabClick = (tab: 'inicio' | 'menu' | 'pedido') => {
    setActiveTab(tab);
    if (tab === 'inicio' || tab === 'menu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'pedido') {
      setIsCartOpen(true);
    }
  };

  return (
    <aside
      aria-label="Navegación inferior"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EAE3D6] py-1.5 px-6 shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* Tab 1: Inicio */}
        <button
          onClick={() => handleTabClick('inicio')}
          className="flex flex-col items-center justify-center gap-0.5 cursor-pointer relative py-1 px-3 group"
        >
          <div className={`p-1 rounded-lg transition-colors ${activeTab === 'inicio' ? 'text-[#164228]' : 'text-[#8C948A]'}`}>
            <Home className="w-5 h-5 fill-current" />
          </div>
          <span className={`text-[11px] font-bold ${activeTab === 'inicio' ? 'text-[#164228]' : 'text-[#8C948A]'}`}>
            Inicio
          </span>
          {activeTab === 'inicio' && (
            <span className="w-6 h-0.5 bg-[#164228] rounded-full mt-0.5" />
          )}
        </button>

        {/* Tab 2: Menú */}
        <button
          onClick={() => handleTabClick('menu')}
          className="flex flex-col items-center justify-center gap-0.5 cursor-pointer relative py-1 px-3 group"
        >
          <div className={`p-1 rounded-lg transition-colors ${activeTab === 'menu' ? 'text-[#164228]' : 'text-[#8C948A]'}`}>
            <Utensils className="w-5 h-5" />
          </div>
          <span className={`text-[11px] font-bold ${activeTab === 'menu' ? 'text-[#164228]' : 'text-[#8C948A]'}`}>
            Menú
          </span>
          {activeTab === 'menu' && (
            <span className="w-6 h-0.5 bg-[#164228] rounded-full mt-0.5" />
          )}
        </button>

        {/* Tab 3: Pedido (Carrito) */}
        <button
          onClick={() => handleTabClick('pedido')}
          className="flex flex-col items-center justify-center gap-0.5 cursor-pointer relative py-1 px-3 group"
        >
          <div className="relative p-1 rounded-lg text-[#8C948A] group-hover:text-[#164228] transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E14936] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-[#8C948A] group-hover:text-[#164228]">
            Pedido
          </span>
        </button>

      </div>
    </aside>
  );
};
