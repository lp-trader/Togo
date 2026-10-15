import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastFeedback: React.FC = () => {
  const { toastMessage, dismissToast, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#1B4931] text-white p-3.5 rounded-2xl shadow-xl border border-[#246242] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 truncate">
          <CheckCircle2 className="w-5 h-5 text-[#F3B433] shrink-0" />
          <span className="text-xs font-semibold truncate">{toastMessage}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              dismissToast();
              setIsCartOpen(true);
            }}
            className="text-[11px] font-bold text-[#F3B433] underline underline-offset-2 hover:text-white transition-colors cursor-pointer"
          >
            Ver Carrito
          </button>
          <button
            onClick={dismissToast}
            aria-label="Cerrar notificación"
            className="text-white/60 hover:text-white transition-colors cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
