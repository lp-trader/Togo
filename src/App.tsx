/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart, AddToCartCustomization } from './context/CartContext';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PopularDishesCarousel } from './components/PopularDishesCarousel';
import { MenuSection } from './components/MenuSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CommercialProposalModal } from './components/CommercialProposalModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { Footer } from './components/Footer';
import { BottomNavigation } from './components/BottomNavigation';
import { ToastFeedback } from './components/ToastFeedback';
import { MenuItem, DemoExtraOption } from './data/menuData';
import { Smartphone, Monitor } from 'lucide-react';

function AppContent() {
  const {
    addToCart,
    completedOrder,
    setCompletedOrder,
  } = useCart();

  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [phoneFrameMode, setPhoneFrameMode] = useState(false);

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1, [], '');
  };

  const handleAddToCartFromModal = (
    item: MenuItem,
    quantity: number,
    customization: AddToCartCustomization
  ) => {
    addToCart(item, quantity, customization);
  };

  return (
    <div className={`min-h-screen bg-[#FAF7F2] flex flex-col ${phoneFrameMode ? 'p-2 sm:p-6 bg-[#E8E2D5]' : ''}`}>
      
      {/* Device frame preview toggle (visible on desktop only for presentations) */}
      <div className="hidden lg:flex items-center justify-end max-w-6xl mx-auto w-full px-4 py-1.5 text-xs text-[#6B5E56] gap-3">
        <span className="text-[11px]">Modo de presentación:</span>
        <div className="inline-flex rounded-lg bg-[#EAE2D5] p-0.5 border border-[#D8CEBE]">
          <button
            onClick={() => setPhoneFrameMode(false)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              !phoneFrameMode ? 'bg-white text-[#1B4931] shadow-2xs' : 'text-[#6B5E56] hover:text-[#1B4931]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive Completo</span>
          </button>
          <button
            onClick={() => setPhoneFrameMode(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              phoneFrameMode ? 'bg-white text-[#1B4931] shadow-2xs' : 'text-[#6B5E56] hover:text-[#1B4931]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Simulador Smartphone</span>
          </button>
        </div>
      </div>

      {/* Main Wrapper: sleek smartphone form factor */}
      <div
        className={`w-full flex-1 flex flex-col bg-[#FAF7F2] ${
          phoneFrameMode
            ? 'max-w-[420px] mx-auto rounded-[44px] shadow-2xl border-[10px] border-[#231D1A] overflow-hidden my-4 min-h-[840px]'
            : 'max-w-md sm:max-w-lg mx-auto shadow-sm sm:my-3 sm:rounded-3xl border border-[#EAE3D6] overflow-hidden min-h-screen'
        }`}
      >
        {/* Top Demo Notification Banner */}
        <DemoNoticeBanner onOpenProposal={() => setIsProposalOpen(true)} />

        {/* Header conforming to Top Bar Contract */}
        <Header
          onOpenProposal={() => setIsProposalOpen(true)}
          onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section with Slogan */}
          <HeroSection onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />

          {/* Carrusel de Platos Más Solicitados */}
          <PopularDishesCarousel
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            onQuickAdd={handleQuickAdd}
          />

          {/* Menu Section: Cuadrícula de 2 columnas de favoritos */}
          <MenuSection
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            onQuickAdd={handleQuickAdd}
          />
        </main>

        {/* Footer */}
        <Footer onOpenProposal={() => setIsProposalOpen(true)} />

        {/* Mobile Floating Bottom Bar */}
        <BottomNavigation
          onScrollToMenu={handleScrollToMenu}
          onOpenProposal={() => setIsProposalOpen(true)}
        />
      </div>

      {/* Floating WhatsApp Action Button */}
      <button
        onClick={() => setIsWhatsAppModalOpen(true)}
        aria-label="WhatsApp Pastas To Go"
        className="fixed bottom-20 md:bottom-6 right-4 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
        title="WhatsApp"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCart={handleAddToCartFromModal}
      />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onOpenProposal={() => setIsProposalOpen(true)}
      />

      {/* Commercial Proposal Modal for Restaurant Owner */}
      <CommercialProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
      />

      {/* WhatsApp Information Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Cart Toast Feedback */}
      <ToastFeedback />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
