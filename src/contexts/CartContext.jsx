import React, { createContext, useState, useContext } from 'react';

// Membuat Context untuk Cart
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (activity) => {
    setCart((prevCart) => [...prevCart, activity]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
