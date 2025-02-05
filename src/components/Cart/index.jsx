import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching cart data from the API instead of localStorage for consistency
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts", {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCartItems(data.data || []))
      .catch((error) => console.error("Error fetching cart items:", error));

    // Fetching payment methods from the API
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods", {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    })
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data.data || []))
      .catch((error) => console.error("Error fetching payment methods:", error));
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    // Optionally update the API or localStorage
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    // Optionally update the API or localStorage
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item) => item !== null);
    setCartItems(updatedCart);
    // Optionally update the API or localStorage
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    const transactionData = {
      activities: cartItems.map((item) => ({
        activity_id: item.id,
        quantity: item.quantity,
      })),
      payment_method_id: selectedPaymentMethod,
    };

    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Transaction successful!");
        navigate("/transactions");
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
        alert("Transaction failed!");
      });
  };

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="font-bold text-gray-800">{item.name}</h2>
                    <p>Price: {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2 py-1 text-white bg-gray-600 rounded">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2 py-1 text-white bg-gray-600 rounded">
                    +
                  </button>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-600">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: Rp {calculateTotalPrice().toLocaleString()}</p>
          </div>
          <div className="mt-4">
            <select
              className="p-2 border border-gray-300 rounded"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleCheckout}
              className="px-6 py-2 text-white bg-green-600 rounded-lg"
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
