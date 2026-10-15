import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, ArrowLeft, Copy, Check, Share2, ChefHat, Clock, Sparkles } from 'lucide-react';
import { SimulatedOrder } from '../types';
import { RESTAURANT_CONFIG } from '../data/menuData';

interface OrderConfirmationModalProps {
  order: SimulatedOrder | null;
  onClose: () => void;
  onOpenProposal: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onOpenProposal,
}) => {
  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const orderTypeLabel =
    order.customer.orderType === 'delivery'
      ? '🛵 Entrega a Domicilio'
      : order.customer.orderType === 'dinein'
      ? '🍽️ Consumo en el Local'
      : '🛍️ Para Recoger en Restaurante';

  // Format a clean, structured order message (as would be forwarded to restaurant WhatsApp or Kitchen printer)
  const formattedTicket = `🍝 *NUEVO PEDIDO DEMO - ${RESTAURANT_CONFIG.name.toUpperCase()}*
🆔 *Orden:* #${order.orderId}
⏰ *Hora:* ${order.createdAt}
📦 *Modalidad:* ${orderTypeLabel}

👤 *Cliente:* ${order.customer.fullName}
📞 *Teléfono:* ${order.customer.phone}
${order.customer.deliveryAddress ? `📍 *Dirección:* ${order.customer.deliveryAddress}\n` : ''}${order.customer.tableNumber ? `🪑 *Mesa:* ${order.customer.tableNumber}\n` : ''}
📋 *DETALLE DEL PEDIDO:*
${order.items.map(item => `• ${item.quantity}x ${item.item.name} ($${item.unitPrice.toFixed(2)} c/u) = $${item.totalPrice.toFixed(2)}${item.pastaType ? `\n  - Pasta: ${item.pastaType} (${item.cookingPoint || 'Al Dente'})` : ''}${item.removedIngredients && item.removedIngredients.length > 0 ? `\n  - ❌ Sin: ${item.removedIngredients.join(', ')}` : ''}${item.selectedExtras.length > 0 ? `\n  - ➕ Extras: ${item.selectedExtras.map(e => e.name).join(', ')}` : ''}${item.notes ? `\n  - 📝 Nota: "${item.notes}"` : ''}`).join('\n')}

💰 *TOTAL:* $${order.total.toFixed(2)}
💳 *Método:* ${order.customer.paymentMethod}

⚠️ *NOTA:* Pedido de simulación para propuesta comercial de Pastas To Go.`;

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(formattedTicket);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3D6] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with celebratory demo graphic */}
        <div className="bg-[#1B4931] text-white p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
          
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] text-[#1B4931] flex items-center justify-center shadow-lg mb-3">
            <CheckCircle className="w-8 h-8 text-[#1B4931]" />
          </div>

          <span className="inline-block text-[11px] font-bold tracking-widest text-[#F3B433] uppercase mb-1">
            Simulación Exitosa
          </span>
          <h2 className="font-brand-display text-2xl font-extrabold text-white">
            Pedido de Demostración
          </h2>
          <p className="text-white/80 text-xs mt-1 font-mono">
            Código de prueba: <span className="font-bold text-[#F3B433]">#{order.orderId}</span>
          </p>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-left flex-1">
          
          {/* Explicit Mandatory Warning Box */}
          <div className="p-4 rounded-2xl bg-[#FFF3EE] border border-[#E14936]/30 flex items-start gap-3 text-xs text-[#8F2213]">
            <AlertTriangle className="w-5 h-5 shrink-0 text-[#E14936] mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-[#E14936]">
                Aviso importante de demostración:
              </p>
              <p className="leading-relaxed">
                Esta es una <strong>demostración comercial</strong> para Pastas To Go. El pedido <strong>NO ha sido enviado</strong> al restaurante y <strong>no se ha realizado ningún pago real</strong>.
              </p>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAE3D6] space-y-3">
            <div className="flex items-center justify-between border-b border-[#F1ECE1] pb-2 text-xs">
              <span className="font-semibold text-[#1B4931]">Modalidad elegida:</span>
              <span className="font-bold text-[#231D1A]">{orderTypeLabel}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6B5E56]">Cliente:</span>
              <span className="font-medium text-[#231D1A]">{order.customer.fullName} ({order.customer.phone})</span>
            </div>

            {order.customer.deliveryAddress && (
              <div className="text-xs">
                <span className="text-[#6B5E56] block">Dirección de entrega:</span>
                <span className="font-medium text-[#231D1A]">{order.customer.deliveryAddress}</span>
              </div>
            )}

            {/* Dishes Summary */}
            <div className="pt-2 border-t border-[#F1ECE1] space-y-2">
              <span className="text-[11px] font-bold text-[#1B4931] uppercase tracking-wider block">
                Platos seleccionados ({order.items.reduce((s, i) => s + i.quantity, 0)} bowls)
              </span>

              {order.items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="flex justify-between items-start text-xs text-[#231D1A]">
                  <div>
                    <span className="font-semibold">
                      {cartItem.quantity}x {cartItem.item.name}
                    </span>
                    {cartItem.pastaType && (
                      <span className="text-[10px] text-[#164228] block">
                        🍝 Pasta: {cartItem.pastaType} ({cartItem.cookingPoint || 'Al Dente'})
                      </span>
                    )}
                    {cartItem.removedIngredients && cartItem.removedIngredients.length > 0 && (
                      <span className="text-[10px] text-[#E14936] block">
                        ❌ Sin: {cartItem.removedIngredients.join(', ')}
                      </span>
                    )}
                    {cartItem.selectedExtras.length > 0 && (
                      <span className="text-[10px] text-[#164228] block">
                        ➕ Extras: {cartItem.selectedExtras.map(e => e.name).join(', ')}
                      </span>
                    )}
                    {cartItem.notes && (
                      <span className="text-[10px] text-[#8C7D73] italic block">
                        Nota: "{cartItem.notes}"
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-[#E14936] tabular-nums shrink-0 ml-2">
                    ${cartItem.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="pt-3 border-t border-[#F1ECE1] flex justify-between items-baseline">
              <span className="font-bold text-sm text-[#1B4931]">Total Simulado</span>
              <span className="font-brand-display text-2xl font-black text-[#E14936] tabular-nums">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Interactive Feature Demo: WhatsApp / Ticket Preview */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3D6] space-y-2">
            <button
              onClick={() => setShowWhatsAppPreview(prev => !prev)}
              className="w-full flex items-center justify-between text-xs font-semibold text-[#1B4931] hover:text-[#E14936] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#E14936]" />
                <span>¿Cómo lo recibiría el restaurante? (Comanda / WhatsApp)</span>
              </div>
              <span className="text-[11px] underline">
                {showWhatsAppPreview ? 'Ocultar' : 'Ver formato'}
              </span>
            </button>

            {showWhatsAppPreview && (
              <div className="mt-2 pt-2 border-t border-[#F1ECE1] space-y-2 animate-in fade-in duration-150">
                <div className="p-3 bg-[#F8F5EE] rounded-xl font-mono text-[11px] text-[#332A24] whitespace-pre-wrap leading-relaxed border border-[#E2D8C6] select-all">
                  {formattedTicket}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-[11px] font-medium text-[#1B4931] hover:text-[#E14936] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>¡Texto copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar comanda de demostración</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick link to proposal for the owner */}
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6] flex items-center justify-between gap-2">
            <div className="text-xs">
              <span className="font-bold text-[#1B4931] block">¿Presentando esta app al dueño?</span>
              <span className="text-[11px] text-[#6B5E56]">Descubre las ventajas comerciales de tener app propia.</span>
            </div>
            <button
              onClick={onOpenProposal}
              className="px-3 py-1.5 rounded-lg bg-[#1B4931] text-white text-xs font-semibold hover:bg-[#163D29] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#F3B433]" />
              <span>Ver Propuesta</span>
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#EAE3D6] space-y-2 shrink-0">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B4931] hover:bg-[#163D29] text-white font-bold text-sm shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Menú Principal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
