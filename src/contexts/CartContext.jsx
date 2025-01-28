import React, { createContext, useState, useContext, useEffect } from 'react';

// Membuat Context untuk Cart
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Mengambil cart dari localStorage saat pertama kali dimuat
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Menambahkan item ke cart
  const addToCart = (activity) => {
    // Mengecek apakah item sudah ada dalam cart
    const isItemInCart = cart.some(item => item.id === activity.id);
    if (isItemInCart) {
      alert("This activity is already in your cart.");
      return;
    }
    const updatedCart = [...cart, activity];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Menyimpan cart ke localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
