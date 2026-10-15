import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../data/menuData';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect, onQuickAdd }) => {
  return (
    <article
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE3D6] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-left"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full bg-[#EAE2D5] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Title and Price on same row */}
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="font-brand-display font-extrabold text-xs sm:text-sm text-[#164228] truncate leading-tight">
              {item.name}
            </h3>
            <span className="font-brand-display font-black text-xs sm:text-sm text-[#164228] tabular-nums shrink-0">
              ${item.price.toFixed(0)}
            </span>
          </div>

          {/* Description */}
          <p className="text-[10px] sm:text-xs text-[#5C645A] leading-tight line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Customization Link & Coral Red "+ Añadir" Button */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] text-[#3B7D4F] font-semibold">
            <span>Personalizable</span>
            <span className="text-[#8C948A] group-hover:text-[#164228] transition-colors underline decoration-dotted">
              Modificar →
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item); // Open customization modal
            }}
            aria-label={`Añadir o personalizar ${item.name} por $${item.price.toFixed(0)}`}
            className="w-full py-1.5 sm:py-2 px-3 rounded-full bg-[#E14936] hover:bg-[#D43724] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Añadir / Personalizar</span>
          </button>
        </div>
      </div>
    </article>
  );
};
