import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  category: string;
  image: string;
  plan: string;
  pricePerMonth: number;
  months: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (name: string, plan: string) => void;
  updateQuantity: (name: string, plan: string, delta: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name && i.plan === item.plan);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name && i.plan === item.plan
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (name: string, plan: string) => {
    setItems((prev) => prev.filter((i) => !(i.name === name && i.plan === plan)));
  };

  const updateQuantity = (name: string, plan: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.name === name && i.plan === plan
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.pricePerMonth * i.months * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartOpen, setCartOpen, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
