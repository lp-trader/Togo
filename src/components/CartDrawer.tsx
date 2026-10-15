import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../data/menuData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItemsCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE3D6] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EAE3D6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B4931]/10 flex items-center justify-center text-[#1B4931]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand-display text-lg font-bold text-[#1B4931]">
                Tu Pedido
              </h2>
              <p className="text-xs text-[#6B5E56]">
                {totalItemsCount} {totalItemsCount === 1 ? 'bowl seleccionado' : 'bowls seleccionados'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-[#8C7D73] hover:text-[#E14936] transition-colors px-2 py-1 cursor-pointer"
                title="Vaciar carrito"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Cerrar carrito"
              className="w-8 h-8 rounded-lg hover:bg-[#F1ECE1] flex items-center justify-center text-[#4A3F39] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAE2D5] flex items-center justify-center text-[#8C7D73]">
                <ShoppingBag className="w-8 h-8 text-[#A09388]" />
              </div>
              <div>
                <h3 className="font-brand-display text-lg font-bold text-[#1B4931]">
                  Tu carrito está vacío
                </h3>
                <p className="mt-1 text-xs text-[#6B5E56] max-w-xs">
                  Añade tus platos favoritos del menú para simular el proceso de pedido de Pastas To Go.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4931] text-white text-xs font-semibold hover:bg-[#163D29] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Explorar el Menú</span>
              </button>
            </div>
          ) : (
            cart.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="bg-white rounded-xl p-3.5 border border-[#EAE3D6] shadow-2xs flex gap-3 text-left"
              >
                {/* Thumbnail */}
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#EAE2D5] shrink-0"
                  referrerPolicy="no-referrer"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-brand-display font-bold text-sm text-[#1B4931] truncate">
                      {cartItem.item.name}
                    </h4>
                    <span className="font-brand-display text-sm font-extrabold text-[#E14936] tabular-nums shrink-0">
                      ${cartItem.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6B5E56] tabular-nums">
                    ${cartItem.unitPrice.toFixed(2)} c/u
                  </p>

                  {/* Customization Details */}
                  {(cartItem.pastaType || (cartItem.removedIngredients && cartItem.removedIngredients.length > 0) || cartItem.selectedExtras.length > 0) && (
                    <div className="mt-1 space-y-0.5 text-[10px]">
                      {cartItem.pastaType && (
                        <p className="text-[#164228] font-medium">
                          🍝 {cartItem.pastaType} {cartItem.cookingPoint ? `(${cartItem.cookingPoint})` : ''}
                        </p>
                      )}
                      {cartItem.removedIngredients && cartItem.removedIngredients.length > 0 && (
                        <p className="text-[#E14936]">
                          ❌ Sin: {cartItem.removedIngredients.join(', ')}
                        </p>
                      )}
                      {cartItem.selectedExtras.length > 0 && (
                        <p className="text-[#164228]">
                          ➕ Con: {cartItem.selectedExtras.map(e => e.name.replace(' (demo)', '')).join(', ')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Notes */}
                  {cartItem.notes && (
                    <p className="mt-1 text-[10px] text-[#8C7D73] italic truncate">
                      "{cartItem.notes}"
                    </p>
                  )}

                  {/* Quantity Stepper and Remove Action */}
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#F6F0E6]">
                    <div className="flex items-center bg-[#F1ECE1] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                        aria-label="Reducir una unidad"
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#1B4931] hover:bg-white/80 active:scale-95 transition-all cursor-pointer shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-[#231D1A] tabular-nums">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                        aria-label="Aumentar una unidad"
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#1B4931] hover:bg-white/80 active:scale-95 transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(cartItem.cartItemId)}
                      aria-label={`Eliminar ${cartItem.item.name} del carrito`}
                      className="p-1.5 text-[#8C7D73] hover:text-[#E14936] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3D6] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6B5E56]">
              <div className="flex justify-between">
                <span>Subtotal platos</span>
                <span className="font-semibold text-[#231D1A] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1">
                  <span>Envase bowl ecológico</span>
                </span>
                <span className="text-[#1B4931] font-medium">Incluido ($0.00)</span>
              </div>
              <div className="pt-2 border-t border-[#F1ECE1] flex justify-between items-baseline text-sm">
                <span className="font-bold text-[#1B4931]">Total a pagar (estimado)</span>
                <span className="font-brand-display text-xl font-extrabold text-[#E14936] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1B4931] hover:bg-[#163D29] text-white font-bold text-sm shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <span>Continuar al Checkout Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-xs text-[#8C7D73] hover:text-[#1B4931] font-medium pt-1 cursor-pointer"
            >
              Volver al menú para seguir agregando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
