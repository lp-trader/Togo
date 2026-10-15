import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, DemoExtraOption } from '../data/menuData';
import { CartItem, SimulatedOrder } from '../types';

export interface AddToCartCustomization {
  pastaType?: string;
  cookingPoint?: string;
  removedIngredients?: string[];
  extras?: DemoExtraOption[];
  notes?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity: number,
    customization?: AddToCartCustomization | DemoExtraOption[],
    notesLegacy?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: SimulatedOrder | null;
  setCompletedOrder: (order: SimulatedOrder | null) => void;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pastas_to_go_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<SimulatedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pastas_to_go_cart', JSON.stringify(cart));
    } catch {
      // storage error fallback
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    quantity: number,
    customization?: AddToCartCustomization | DemoExtraOption[],
    notesLegacy: string = ''
  ) => {
    let pastaType: string | undefined = undefined;
    let cookingPoint: string | undefined = undefined;
    let removedIngredients: string[] = [];
    let extras: DemoExtraOption[] = [];
    let notes = '';

    if (Array.isArray(customization)) {
      extras = customization;
      notes = notesLegacy;
    } else if (customization) {
      pastaType = customization.pastaType;
      cookingPoint = customization.cookingPoint;
      removedIngredients = customization.removedIngredients || [];
      extras = customization.extras || [];
      notes = customization.notes || '';
    }

    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = item.price + extrasPrice;
    
    // Unique identifier combining dish ID, pasta, removed ingredients, extras and notes
    const extrasKey = extras.map(e => e.id).sort().join('-');
    const removedKey = [...removedIngredients].sort().join('-');
    const cartItemId = `${item.id}_${pastaType || 'std'}_${cookingPoint || 'std'}_${removedKey}_${extrasKey}_${notes.trim().toLowerCase()}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(ci => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          quantity,
          pastaType,
          cookingPoint,
          removedIngredients,
          selectedExtras: extras,
          notes,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    setToastMessage(`¡${item.name} (${quantity}) añadido al carrito!`);
    setTimeout(() => {
      setToastMessage(prev => (prev?.includes(item.name) ? null : prev));
    }, 2800);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(ci => {
          if (ci.cartItemId === cartItemId) {
            const nextQty = ci.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...ci,
              quantity: nextQty,
              totalPrice: ci.unitPrice * nextQty,
            };
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(ci => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const dismissToast = () => setToastMessage(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        toastMessage,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
