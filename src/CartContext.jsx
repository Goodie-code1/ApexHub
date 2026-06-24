import { createContext, useContext, useState } from "react";
import { PRODUCTS } from "./data/products";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, size, qty }
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product, size, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, size, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (id, size) =>
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const updateQty = (id, size, qty) => {
    if (qty <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const lineItems = items.map((i) => ({
    ...i,
    product: PRODUCTS.find((p) => p.id === i.id),
  }));

  const subtotal = lineItems.reduce(
    (sum, i) => sum + (i.product?.price || 0) * i.qty,
    0
  );
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: lineItems,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}