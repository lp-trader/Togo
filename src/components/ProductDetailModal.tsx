import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Clock, MessageSquare, Utensils, Ban, Sparkles } from 'lucide-react';
import { MenuItem, DemoExtraOption, PASTA_TYPES, COOKING_POINTS } from '../data/menuData';
import { AddToCartCustomization } from '../context/CartContext';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customization: AddToCartCustomization) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedPasta, setSelectedPasta] = useState('spaghetti');
  const [cookingPoint, setCookingPoint] = useState('al-dente');
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<DemoExtraOption[]>([]);
  const [notes, setNotes] = useState('');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Reset state when opening a new dish
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedPasta('spaghetti');
      setCookingPoint('al-dente');
      setRemovedIngredients([]);
      setSelectedExtras([]);
      setNotes('');
      setIsAddedFeedback(false);
    }
  }, [item]);

  if (!item) return null;

  // Toggle exclusion of a base ingredient (quitar cosas)
  const toggleRemovedIngredient = (ingredient: string) => {
    setRemovedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Toggle extra additions (agregar cosas)
  const toggleExtra = (extra: DemoExtraOption) => {
    setSelectedExtras(prev =>
      prev.some(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const pastaName = PASTA_TYPES.find(p => p.id === selectedPasta)?.name || 'Spaghetti';
    const cookingName = COOKING_POINTS.find(c => c.id === cookingPoint)?.name || 'Al Dente';

    onAddToCart(item, quantity, {
      pastaType: pastaName,
      cookingPoint: cookingName,
      removedIngredients,
      extras: selectedExtras,
      notes: notes.trim(),
    });

    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3D6] flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar personalización"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Customization Container */}
        <div className="overflow-y-auto flex-1">
          {/* Dish Image Banner */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#EAE2D5] overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <span className="bg-[#164228]/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-md">
                {item.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 text-xs bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-[#F4B333]" />
                <span>{item.prepTime}</span>
              </div>
            </div>
          </div>

          {/* Details & Customization Options */}
          <div className="p-4 sm:p-6 space-y-6 text-left">
            
            {/* Title & Description */}
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-brand-display text-2xl font-black text-[#164228]">
                  {item.name}
                </h3>
                <span className="font-brand-display text-2xl font-black text-[#E14936] tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#4A3F39] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* SECCIÓN 1: QUITAR INGREDIENTES ("Quitar cosas") */}
            <div className="pt-2 border-t border-[#EAE3D6] space-y-2.5">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold text-[#164228] uppercase tracking-wider flex items-center gap-1.5">
                  <Ban className="w-3.5 h-3.5 text-[#E14936]" />
                  <span>Quitar o Excluir Ingredientes</span>
                </label>
                <span className="text-[11px] text-[#8C948A]">
                  Toca para quitar
                </span>
              </div>
              <p className="text-[11px] text-[#6B5E56]">
                ¿Prefieres tu bowl sin algún ingrediente? Selecciona los que desees excluir:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {item.baseIngredients.map((ingredient) => {
                  const isRemoved = removedIngredients.includes(ingredient);
                  return (
                    <button
                      key={ingredient}
                      type="button"
                      onClick={() => toggleRemovedIngredient(ingredient)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isRemoved
                          ? 'bg-[#FDF2F0] border-[#E14936] text-[#A62719] shadow-2xs'
                          : 'bg-white border-[#EAE3D6] text-[#231D1A] hover:border-[#C4B7A5]'
                      }`}
                    >
                      <span className={`text-xs font-semibold ${isRemoved ? 'line-through opacity-85' : ''}`}>
                        {ingredient}
                      </span>
                      {isRemoved ? (
                        <span className="text-[10px] font-bold bg-[#E14936] text-white px-1.5 py-0.5 rounded-md shrink-0">
                          Sin
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-[#3B7D4F] bg-[#3B7D4F]/10 px-1.5 py-0.5 rounded-md shrink-0">
                          Incluido
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN 2: TIPO DE PASTA */}
            <div className="pt-2 border-t border-[#EAE3D6] space-y-2.5">
              <label className="text-xs font-bold text-[#164228] uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#F4B333]" />
                <span>Tipo de Pasta a tu Elección</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {PASTA_TYPES.map((pasta) => {
                  const isSelected = selectedPasta === pasta.id;
                  return (
                    <button
                      key={pasta.id}
                      type="button"
                      onClick={() => setSelectedPasta(pasta.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#164228] border-[#164228] text-white shadow-xs'
                          : 'bg-white border-[#EAE3D6] text-[#231D1A] hover:border-[#C4B7A5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{pasta.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#8C948A]'}`}>
                        {pasta.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN 3: PUNTO DE COCCIÓN */}
            <div className="pt-2 border-t border-[#EAE3D6] space-y-2.5">
              <label className="text-xs font-bold text-[#164228] uppercase tracking-wider">
                Término de Cocción
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COOKING_POINTS.map((pt) => {
                  const isSelected = cookingPoint === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setCookingPoint(pt.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#164228] border-[#164228] text-white shadow-xs'
                          : 'bg-white border-[#EAE3D6] text-[#231D1A] hover:border-[#C4B7A5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{pt.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-[10px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#8C948A]'}`}>
                        {pt.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN 4: AGREGAR COMPLEMENTOS ("Agregar cosas") */}
            <div className="pt-2 border-t border-[#EAE3D6] space-y-2.5">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold text-[#164228] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4B333]" />
                  <span>Agregar Complementos y Extras</span>
                </label>
                <span className="text-[11px] text-[#8C948A]">
                  Opcional
                </span>
              </div>

              <div className="space-y-2">
                {item.availableExtras.map((extra) => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#164228]/5 border-[#164228] text-[#164228]'
                          : 'bg-white border-[#EAE3D6] text-[#231D1A] hover:border-[#C4B7A5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-[#164228] border-[#164228] text-white'
                              : 'border-[#D6C7B2] bg-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3 h-3 text-[#8C948A]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{extra.name}</span>
                      </div>
                      <span className="text-xs font-black text-[#E14936] tabular-nums">
                        +${extra.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN 5: OBSERVACIONES PARA LA COCINA */}
            <div className="pt-2 border-t border-[#EAE3D6] space-y-2">
              <label htmlFor="dish-notes" className="text-xs font-bold text-[#164228] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#E14936]" />
                <span>Observaciones Especiales</span>
                <span className="text-[#8C948A] font-normal lowercase">(opcional)</span>
              </label>
              <textarea
                id="dish-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Ejemplo: Salsa aparte, poco picante, tenedor adicional, bien caliente..."
                className="w-full text-xs p-3 rounded-xl border border-[#D8CEBE] bg-white text-[#231D1A] placeholder-[#A09388] focus:outline-hidden focus:ring-2 focus:ring-[#164228] transition-all resize-none"
              />
            </div>

            {/* RESUMEN EN VIVO DE MODIFICACIONES */}
            {(removedIngredients.length > 0 || selectedExtras.length > 0 || selectedPasta !== 'spaghetti') && (
              <div className="p-3 bg-white rounded-2xl border border-[#EAE3D6] space-y-1.5 text-xs text-left">
                <span className="text-[10px] font-bold text-[#164228] uppercase tracking-wider block">
                  Tu Personalización:
                </span>
                <div className="text-[11px] text-[#4A3F39] space-y-0.5">
                  <p>
                    🍝 <strong>Pasta:</strong> {PASTA_TYPES.find(p => p.id === selectedPasta)?.name} ({COOKING_POINTS.find(c => c.id === cookingPoint)?.name})
                  </p>
                  {removedIngredients.length > 0 && (
                    <p className="text-[#E14936]">
                      ❌ <strong>Excluir:</strong> Sin {removedIngredients.join(', ')}
                    </p>
                  )}
                  {selectedExtras.length > 0 && (
                    <p className="text-[#164228]">
                      ➕ <strong>Extras:</strong> {selectedExtras.map(e => `${e.name} (+$${e.price.toFixed(2)})`).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sticky Purchase Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-[#EAE3D6] flex items-center gap-3 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-[#F1ECE1] rounded-xl p-1 shrink-0">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#164228] disabled:opacity-40 hover:bg-white/80 active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-black text-sm text-[#231D1A] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              aria-label="Aumentar cantidad"
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#164228] hover:bg-white/80 active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            disabled={isAddedFeedback}
            className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-md cursor-pointer ${
              isAddedFeedback
                ? 'bg-[#164228] scale-98'
                : 'bg-[#E14936] hover:bg-[#D43724] active:scale-98'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {isAddedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Bowl añadido al carrito!</span>
                </>
              ) : (
                <span>Añadir Bowl al Carrito</span>
              )}
            </span>
            <span className="font-black text-sm sm:text-base tabular-nums">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
