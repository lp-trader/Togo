import React, { useState } from 'react';
import { X, Bike, ShoppingBag, Utensils, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderType, SimulatedOrder } from '../types';
import { RESTAURANT_CONFIG } from '../data/menuData';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setCompletedOrder,
  } = useCart();

  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('efectivo');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Por favor ingresa tu nombre completo (mínimo 3 letras).';
    }

    if (!phone.trim() || phone.trim().length < 7) {
      newErrors.phone = 'Por favor ingresa un número de teléfono válido para coordinar el pedido.';
    }

    if (orderType === 'delivery' && (!address.trim() || address.trim().length < 5)) {
      newErrors.address = 'Por favor ingresa la dirección completa de entrega.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Generate simulated order
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: SimulatedOrder = {
      orderId: `PTG-DEMO-${randomSuffix}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        orderType,
        deliveryAddress: orderType === 'delivery' ? address.trim() : undefined,
        deliveryNotes: orderType === 'delivery' && deliveryNotes.trim() ? deliveryNotes.trim() : undefined,
        tableNumber: orderType === 'dinein' && tableNumber.trim() ? tableNumber.trim() : undefined,
        paymentMethod:
          paymentMethod === 'efectivo'
            ? 'Efectivo contra entrega (demo)'
            : paymentMethod === 'punto'
            ? 'Punto de venta / Tarjeta contra entrega (demo)'
            : 'Pago Móvil / Transferencia (demo)',
      },
      items: [...cart],
      subtotal,
      deliveryFee: 0, // No inventamos tarifas
      total: subtotal,
      isDemo: true,
      status: 'received',
    };

    setCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3D6] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EAE3D6] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#E14936] uppercase tracking-wider">
              <span>Simulación de Pedido</span>
            </div>
            <h2 className="font-brand-display text-xl font-bold text-[#1B4931]">
              Finalizar Pedido Demo
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Cerrar checkout"
            className="w-8 h-8 rounded-lg hover:bg-[#F1ECE1] flex items-center justify-center text-[#4A3F39] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleConfirmOrder} className="overflow-y-auto p-4 sm:p-6 space-y-5 text-left flex-1">
          
          {/* Demo Alert Box */}
          <div className="p-3.5 rounded-xl bg-[#FFF5E6] border border-[#F3B433]/40 flex items-start gap-2.5 text-xs text-[#8C5E14]">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#E14936]" />
            <div className="space-y-0.5">
              <p className="font-bold text-[#E14936]">
                Aviso de Demostración Comercial
              </p>
              <p>
                No se procesará ningún pago real ni se enviará este pedido al restaurante. Es una simulación interactiva para mostrar la experiencia de compra.
              </p>
            </div>
          </div>

          {/* 1. Modalidad de entrega */}
          <div>
            <label className="block text-xs font-bold text-[#1B4931] uppercase tracking-wider mb-2">
              1. Modalidad del Pedido
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[#1B4931] text-white border-[#1B4931] shadow-xs'
                    : 'bg-white border-[#EAE3D6] text-[#4A3F39] hover:border-[#D6C7B2]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-semibold">Para Recoger</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#1B4931] text-white border-[#1B4931] shadow-xs'
                    : 'bg-white border-[#EAE3D6] text-[#4A3F39] hover:border-[#D6C7B2]'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span className="text-xs font-semibold">Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('dinein')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                  orderType === 'dinein'
                    ? 'bg-[#1B4931] text-white border-[#1B4931] shadow-xs'
                    : 'bg-white border-[#EAE3D6] text-[#4A3F39] hover:border-[#D6C7B2]'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span className="text-xs font-semibold">En Local</span>
              </button>
            </div>
          </div>

          {/* 2. Datos del cliente */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#1B4931] uppercase tracking-wider">
              2. Tus Datos de Contacto
            </label>

            <div>
              <label htmlFor="customer-name" className="block text-[11px] font-medium text-[#6B5E56] mb-1">
                Nombre y Apellido *
              </label>
              <input
                id="customer-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className={`w-full text-xs p-3 rounded-xl border bg-white text-[#231D1A] placeholder-[#A09388] focus:outline-hidden focus:ring-2 focus:ring-[#1B4931] transition-all ${
                  errors.fullName ? 'border-[#E14936]' : 'border-[#D8CEBE]'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-[11px] text-[#E14936] font-medium">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="customer-phone" className="block text-[11px] font-medium text-[#6B5E56] mb-1">
                Teléfono de Contacto *
              </label>
              <input
                id="customer-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. +58 412 1234567"
                className={`w-full text-xs p-3 rounded-xl border bg-white text-[#231D1A] placeholder-[#A09388] focus:outline-hidden focus:ring-2 focus:ring-[#1B4931] transition-all ${
                  errors.phone ? 'border-[#E14936]' : 'border-[#D8CEBE]'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-[#E14936] font-medium">{errors.phone}</p>
              )}
            </div>

            {/* Conditional Delivery Address */}
            {orderType === 'delivery' && (
              <div className="space-y-2 pt-1 animate-in fade-in duration-150">
                <div>
                  <label htmlFor="delivery-address" className="block text-[11px] font-medium text-[#6B5E56] mb-1">
                    Dirección de Entrega *
                  </label>
                  <input
                    id="delivery-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, Edificio, Número de Casa o Apto"
                    className={`w-full text-xs p-3 rounded-xl border bg-white text-[#231D1A] placeholder-[#A09388] focus:outline-hidden focus:ring-2 focus:ring-[#1B4931] transition-all ${
                      errors.address ? 'border-[#E14936]' : 'border-[#D8CEBE]'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-[11px] text-[#E14936] font-medium">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="delivery-notes" className="block text-[11px] font-medium text-[#6B5E56] mb-1">
                    Punto de Referencia (opcional)
                  </label>
                  <input
                    id="delivery-notes"
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Frente a la plaza, portón blanco..."
                    className="w-full text-xs p-3 rounded-xl border border-[#D8CEBE] bg-white text-[#231D1A] placeholder-[#A09388] focus:outline-hidden focus:ring-2 focus:ring-[#1B4931]"
                  />
                </div>
              </div>
            )}

            {/* Conditional Dine-in Table */}
            {orderType === 'dinein' && (
              <div className="pt-1 animate-in fade-in duration-150">
                <label htmlFor="table-number" className="block text-[11px] font-medium text-[#6B5E56] mb-1">
                  Número de Mesa o Ubicación (opcional si ya estás sentado)
                </label>
                <input
                  id="table-number"
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Mesa #4, Terraza, Barra..."
                  className="w-full text-xs p-3 rounded-xl border border-[#D8CEBE] bg-white text-[#231D1A] placeholder-[#A09388] focus:outline-hidden focus:ring-2 focus:ring-[#1B4931]"
                />
              </div>
            )}
          </div>

          {/* 3. Método de pago simulado */}
          <div>
            <label className="block text-xs font-bold text-[#1B4931] uppercase tracking-wider mb-2">
              3. Forma de Pago (Simulación Demo)
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#EAE3D6] bg-white cursor-pointer hover:border-[#D6C7B2]">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'efectivo'}
                  onChange={() => setPaymentMethod('efectivo')}
                  className="text-[#1B4931] focus:ring-[#1B4931]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#231D1A] block">Efectivo al recibir</span>
                  <span className="text-[#6B5E56] text-[11px]">Pagas al momento de recibir tus bowls</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#EAE3D6] bg-white cursor-pointer hover:border-[#D6C7B2]">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'punto'}
                  onChange={() => setPaymentMethod('punto')}
                  className="text-[#1B4931] focus:ring-[#1B4931]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#231D1A] block">Punto de venta / Tarjeta contra entrega</span>
                  <span className="text-[#6B5E56] text-[11px]">Cobro con datáfono inalámbrico</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#EAE3D6] bg-white cursor-pointer hover:border-[#D6C7B2]">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'transferencia'}
                  onChange={() => setPaymentMethod('transferencia')}
                  className="text-[#1B4931] focus:ring-[#1B4931]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#231D1A] block">Transferencia / Pago Móvil (demo)</span>
                  <span className="text-[#6B5E56] text-[11px]">Reporte de comprobante al WhatsApp del restaurante</span>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Resumen compacto del pedido */}
          <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D6] space-y-2">
            <span className="text-[11px] font-bold text-[#1B4931] uppercase tracking-wider block">
              Resumen del Pedido ({cart.reduce((a, b) => a + b.quantity, 0)} bowls)
            </span>
            <div className="space-y-1 text-xs">
              {cart.map(c => (
                <div key={c.cartItemId} className="flex justify-between text-[#4A3F39]">
                  <span className="truncate pr-2">
                    {c.quantity}x {c.item.name}
                  </span>
                  <span className="font-semibold tabular-nums shrink-0">
                    ${c.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#F1ECE1] flex justify-between font-bold text-sm text-[#1B4931]">
                <span>Total Estimado</span>
                <span className="text-[#E14936] text-base tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl bg-[#E14936] hover:bg-[#CC3B29] active:scale-98 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Pedido de Demostración</span>
            </button>
            <p className="mt-2 text-center text-[10px] text-[#8C7D73]">
              Simulación de demostración · No se realiza ningún cobro ni envío real.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
