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

  // Menghitung total harga semua item dalam keranjang
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Fungsi untuk checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container p-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-lg">
          {/* Daftar Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4">
                <input type="checkbox" className="w-5 h-5 mr-4 text-blue-500 rounded focus:ring focus:ring-blue-300" />
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="object-cover w-20 h-20 border rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-bold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-600">Price: Rp {item.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-800">
                    Total: Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-4 py-2 ml-4 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Bagian Footer */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Total: Rp {calculateTotalPrice().toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">Including all applicable taxes</p>
            </div>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
