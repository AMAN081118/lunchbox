import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  canteen_id: string;
  image_url?: string;
  isVeg?: boolean;
}

interface CartState {
  items: CartItem[];
  canteenId: string | null;
  subtotal: number;
  tax: number;
  total: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      canteenId: null,
      subtotal: 0,
      tax: 0,
      total: 0,

      addItem: (item) => {
        const { items, canteenId } = get();

        // Prevent mixing canteens
        if (canteenId && canteenId !== item.canteen_id) {
          alert("You can only order from one canteen at a time.");
          return;
        }

        const existing = items.find((i) => i.id === item.id);
        let newItems;
        if (existing) {
          newItems = items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        } else {
          newItems = [...items, { ...item, quantity: 1 }];
        }

        const subtotal = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        const tax = subtotal * 0.05; // 5% GST (adjust as needed)
        const total = subtotal + tax;

        set({
          items: newItems,
          canteenId: item.canteen_id,
          subtotal,
          tax,
          total,
        });
      },

      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        const subtotal = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        set({
          items: newItems,
          subtotal,
          tax,
          total,
          canteenId: newItems.length ? newItems[0].canteen_id : null,
        });
      },

      updateQuantity: (id, qty) => {
        const newItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity: qty } : i,
        );
        const subtotal = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        set({ items: newItems, subtotal, tax, total });
      },

      clearCart: () =>
        set({ items: [], subtotal: 0, tax: 0, total: 0, canteenId: null }),
    }),
    {
      name: "canteen-cart-storage", // key in localStorage
    },
  ),
);
