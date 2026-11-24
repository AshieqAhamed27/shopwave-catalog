import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopwave_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopwave_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('shopwave_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ORD-SW-2026-8102',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          status: 'Delivered',
          items: [
            {
              id: 'oxford-shirt-blue',
              name: "Men's Slim Fit Oxford Cotton Button-Down Shirt",
              price: 2499,
              qty: 1,
              images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80']
            }
          ],
          pricing: { subtotal: 2499, shipping: 0, total: 2499 },
          customer: {
            name: 'Ashieq Ahamed',
            email: 'ashieq@shopwave.in',
            phone: '9876543210',
            address: 'No. 42, Crescent Avenue, GST Road',
            city: 'Chennai'
          },
          payment: {
            method: 'upi',
            transactionId: 'TXN-RBI-98432198',
            status: 'PAID'
          }
        }
      ];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ---- Auth State (ShopWave Atelier Member) ----
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopwave_user') || localStorage.getItem('adiclub_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopwave_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('shopwave_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('shopwave_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // ---- Toast ----
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  // ---- Login & Register ----
  const login = useCallback((userData) => {
    const defaultUser = {
      name: userData?.name || 'Ashieq Ahamed',
      email: userData?.email || 'ashieq@shopwave.in',
      phone: userData?.phone || '+91 98765 43210',
      tier: 'Atelier Privilege Member',
      rrn: userData?.rrn || '230071601031',
      points: 4250,
      joined: 'Member since August 2026',
      avatar: userData?.avatar || 'AA',
      ...userData
    };
    setUser(defaultUser);
    localStorage.setItem('shopwave_user', JSON.stringify(defaultUser));
    addToast(`Welcome, ${defaultUser.name}! (Atelier Privilege Member) ✨`, 'success');
  }, [addToast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('shopwave_user');
    localStorage.removeItem('adiclub_user');
    addToast('Signed out of your ShopWave Atelier account.', 'info');
  }, [addToast]);

  // ---- Orders ----
  const addOrder = useCallback((newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  // ---- Cart ----
  const addToCart = useCallback((product, qtyToAdd = 1) => {
    const count = typeof qtyToAdd === 'number' && qtyToAdd > 0 ? qtyToAdd : 1;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + count } : item
        );
      }
      return [...prev, { ...product, qty: count }];
    });
    addToast(`${product.name} added to cart! 🛍️`, 'success');
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

  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  // ---- Wishlist ----
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const isIn = prev.some(p => p.id === product.id);
      if (isIn) {
        addToast(`Removed from saved items`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        addToast(`${product.name} saved to wishlist! ♥`, 'success');
        return [...prev, product];
      }
    });
  }, [addToast]);

  const isInWishlist = useCallback((id) => wishlist.some(p => p.id === id), [wishlist]);

  return (
    <ShopContext.Provider value={{
      user, login, logout,
      orders, addOrder,
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
