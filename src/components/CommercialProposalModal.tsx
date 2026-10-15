import React from 'react';
import { X, Sparkles, TrendingUp, Smartphone, MessageCircle, DollarSign, Database, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/menuData';

interface CommercialProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommercialProposalModal: React.FC<CommercialProposalModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5 text-[#E14936]" />,
      title: '0% Comisiones por Venta',
      description: 'Ahorra entre un 20% y 30% en comparación con las plataformas de delivery tradicionales en cada pedido directo.',
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#1B4931]" />,
      title: 'Integración Directa con WhatsApp',
      description: 'El cliente arma su bowl y el restaurante recibe un mensaje con resumen exacto, dirección y total listo para procesar.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#F3B433]" />,
      title: 'Diseño Web Móvil Rápido (PWA)',
      description: 'Sin necesidad de descargar apps pesadas desde la App Store. Abre al instante escaneando un código QR en el local o desde Instagram.',
    },
    {
      icon: <Database className="w-5 h-5 text-[#1B4931]" />,
      title: 'Tu Propia Base de Clientes',
      description: 'Accede a los teléfonos y preferencias de tus clientes para promociones, lanzamientos de nuevas salsas y programas de lealtad.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#E14936]" />,
      title: 'Menú Autogestionable',
      description: 'Activa o desactiva platos, actualiza precios y agrega promociones semanales en segundos desde un panel de control.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3D6] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1B4931] text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F3B433] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Propuesta Comercial para el Restaurante</span>
            </div>
            <h2 className="font-brand-display text-2xl font-extrabold text-white">
              ¿Por qué {RESTAURANT_CONFIG.name} necesita su propia App?
            </h2>
            <p className="text-white/80 text-xs">
              Presentación de valor comercial y retorno de inversión
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar propuesta"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-left flex-1">
          <div className="p-3.5 rounded-xl bg-white border border-[#EAE3D6] text-xs text-[#4A3F39] leading-relaxed">
            Esta aplicación ha sido diseñada específicamente para la identidad visual de <strong>Pastas To Go</strong> ("Tradición en un Bowl"), destacando sus colores institucionales, fotografía gastronómica de alta definición y un proceso de compra intuitivo de menos de 60 segundos.
          </div>

          <div className="space-y-3">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-2xl border border-[#EAE3D6] flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] shrink-0 border border-[#F1ECE1]">
                  {b.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-brand-display font-bold text-sm text-[#1B4931]">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#6B5E56] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Siguiente paso */}
          <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#F3B433]/40 space-y-2">
            <h4 className="font-bold text-xs text-[#8C5E14] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E14936]" />
              <span>Siguiente paso de desarrollo</span>
            </h4>
            <p className="text-xs text-[#6B5E56] leading-relaxed">
              Validar el menú oficial de platos, precios autorizados, zonas de reparto y número de WhatsApp comercial para la puesta en marcha de la versión definitiva.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#EAE3D6] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1B4931] hover:bg-[#163D29] text-white text-xs font-bold transition-all cursor-pointer"
          >
            Entendido, volver a la demo
          </button>
        </div>
      </div>
    </div>
  );
};
