import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch cart data from the API
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts", {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCartItems(data.data || []))
      .catch((error) => console.error("Error fetching cart items:", error));

    // Fetch payment methods
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
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vbmE0QGdtYWlsLmNvbSIsInVzZXJJZCI6IjcyMzBkMmMyLTU0ZjEtNDZhNS04ZTQ4LWQ2YjQ3ZGEyN2M4NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3NDQ5Njc2fQ.SZlMq8VYrBkWDAGQF2FeWagqpMJ4QohLtFgm5_hon3w",
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
              <li key={item.id} className="mb-4 flex items-center">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 mr-4" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p>Price: Rp {item.price.toLocaleString()}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                    +
                  </button>
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                    -
                  </button>
                  <button onClick={() => handleRemoveItem(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h2 className="text-lg font-bold">Select Payment Method</h2>
            <select
              className="mt-2 w-full p-2 bg-white border rounded"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              value={selectedPaymentMethod}
            >
              <option value="">Select a payment method</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-right">
            <h2 className="text-xl font-bold">Total: Rp {calculateTotalPrice().toLocaleString()}</h2>
            <button onClick={handleCheckout} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
