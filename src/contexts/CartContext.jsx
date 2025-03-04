// contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (activity) => {
    const isItemInCart = cart.some(item => item.id === activity.id);
    if (isItemInCart) {
      alert("This activity is already in your cart.");
      return;
    }
    const updatedCart = [...cart, activity];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Simpan cart ke localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
