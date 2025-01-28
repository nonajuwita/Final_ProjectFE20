// components/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Memuat cart dari localStorage saat komponen di-render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Fungsi untuk mengarahkan user ke halaman checkout (atau halaman lainnya)
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
    } else {
      // Arahkan ke halaman checkout atau proses pembayaran
      navigate("/checkout");
    }
  };

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  <span className="ml-4 text-gray-800">{item.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
            <span className="font-bold text-gray-800">
              Total Items: {cartItems.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
