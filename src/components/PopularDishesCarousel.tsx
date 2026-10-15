import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Flame, Plus, Star } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface PopularDishesCarouselProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const PopularDishesCarousel: React.FC<PopularDishesCarouselProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to update arrows
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 260;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Top highlight labels for the dishes in the carousel
  const highlights = [
    { badge: 'Top #1 Más Vendido', color: 'bg-[#E14936]' },
    { badge: 'Especial del Chef', color: 'bg-[#164228]' },
    { badge: 'Sabor Casero', color: 'bg-[#C87A18]' },
    { badge: 'Recomendado', color: 'bg-[#3B7D4F]' },
  ];

  return (
    <section className="pt-2 pb-6 px-3 sm:px-4 max-w-2xl mx-auto text-left">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E14936] uppercase tracking-wider mb-0.5">
            <Flame className="w-3.5 h-3.5 fill-[#E14936]" />
            <span>Top Ventas</span>
          </div>
          <h2 className="font-brand-display text-xl sm:text-2xl font-black text-[#164228] tracking-tight">
            Platos Más Solicitados
          </h2>
          <p className="text-xs text-[#5C645A]">
            Desliza para ver los bowls más pedidos de Pastas To Go
          </p>
        </div>

        {/* Carousel Prev / Next Arrow Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Ver platos anteriores"
            className="w-8 h-8 rounded-full bg-white border border-[#EAE3D6] flex items-center justify-center text-[#164228] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF7F2] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Ver siguientes platos"
            className="w-8 h-8 rounded-full bg-white border border-[#EAE3D6] flex items-center justify-center text-[#164228] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF7F2] transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 -mx-1 px-1 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MENU_ITEMS.map((item, index) => {
          const highlight = highlights[index % highlights.length];
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="snap-start shrink-0 w-[215px] sm:w-[245px] bg-white rounded-2xl border border-[#EAE3D6] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Product Image with Highlight Badge */}
              <div className="relative aspect-[4/3] w-full bg-[#EAE2D5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Ranking Tag */}
                <div className={`absolute top-2 left-2 ${highlight.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1`}>
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>{highlight.badge}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-brand-display font-extrabold text-sm text-[#164228] truncate leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-brand-display font-black text-sm text-[#164228] tabular-nums shrink-0">
                      ${item.price.toFixed(0)}
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-[#5C645A] leading-tight line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Personalizar & Añadir Button */}
                <div className="space-y-1 pt-1">
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
                      onSelectItem(item);
                    }}
                    className="w-full py-1.5 px-3 rounded-full bg-[#E14936] hover:bg-[#D43724] active:scale-95 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Añadir / Personalizar</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe Hint indicator for mobile users */}
      <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-[#8C948A] sm:hidden">
        <span>← Desliza para explorar los platos más pedidos →</span>
      </div>
    </section>
  );
};
