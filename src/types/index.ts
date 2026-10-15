import { MenuItem, DemoExtraOption } from '../data/menuData';

export type OrderType = 'takeaway' | 'delivery' | 'dinein';

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  pastaType?: string;
  cookingPoint?: string;
  removedIngredients: string[];
  selectedExtras: DemoExtraOption[];
  notes: string;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  deliveryNotes?: string;
  tableNumber?: string;
  paymentMethod: string;
}

export interface SimulatedOrder {
  orderId: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  isDemo: boolean;
  status: 'received' | 'in_kitchen' | 'ready';
}
