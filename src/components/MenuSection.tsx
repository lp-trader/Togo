import React from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  return (
    <section id="menu" className="pt-2 pb-16 px-3 sm:px-4 max-w-2xl mx-auto text-left">
      {/* Section Title with warm golden underline accent */}
      <div className="mb-3.5">
        <h2 className="font-brand-display text-xl sm:text-2xl font-black text-[#164228] tracking-tight">
          Nuestros favoritos
        </h2>
        {/* Subtle curved golden stroke */}
        <svg
          className="w-28 sm:w-36 h-2 mt-0.5 text-[#F4B333]"
          viewBox="0 0 140 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 2,4 Q 70,1 138,5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2-column grid displaying multiple dishes in a single view, exactly as reference */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        {MENU_ITEMS.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onSelect={onSelectItem}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </section>
  );
};
