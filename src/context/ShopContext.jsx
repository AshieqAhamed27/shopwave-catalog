import { createContext, useContext, useState, useCallback } from 'react';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ---- Toast ----
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  // ---- Cart ----
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`${product.name} added to cart! 🛒`, 'success');
  }, [addToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // ---- Wishlist ----
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const isIn = prev.some(p => p.id === product.id);
      if (isIn) {
        addToast(`Removed from wishlist`, 'error');
        return prev.filter(p => p.id !== product.id);
      } else {
        addToast(`${product.name} added to wishlist! ♥`, 'success');
        return [...prev, product];
      }
    });
  }, [addToast]);

  const isInWishlist = useCallback((id) => wishlist.some(p => p.id === id), [wishlist]);

  return (
    <ShopContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist, isInWishlist,
      cartOpen, setCartOpen,
      toasts, addToast,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
};
