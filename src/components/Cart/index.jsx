import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    // Fetch cart data from API
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts", {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart Data:", data);
        setCartItems(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart data.");
      });

    // Fetch payment methods
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods", {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    })
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data.data || []))
      .catch((error) => console.error("Error fetching payment methods:", error));

    setLoading(false);
  }, [token, navigate]);

  // Menghitung total harga semua item dalam cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Proses Checkout
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

    console.log("Sending transaction data:", transactionData);

    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Transaction Response:", data);
        if (data.success) {
          alert("Transaction successful!");
          navigate("/transactions");
        } else {
          alert("Transaction failed: " + (data.message || "Unknown error"));
        }
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
        alert("Transaction failed!");
      });
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
                    <p className="text-sm text-gray-600">Price: Rp {item.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-bold text-gray-600">
                      Total: Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">
              Total Price: Rp {calculateTotalPrice().toLocaleString()}
            </h3>
          </div>

          <div className="mt-6">
            <label htmlFor="payment-method" className="block mb-2 text-sm font-medium text-gray-700">
              Select Payment Method
            </label>
            <select
              id="payment-method"
              className="w-full px-4 py-2 border rounded-md"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">-- Choose a Payment Method --</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
            <span className="font-bold text-gray-800">Total Items: {cartItems.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
