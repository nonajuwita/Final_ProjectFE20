import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useCart } from "../../hooks/useCart";
import { useTransaction } from "../../hooks/useTransaction";

const Cart = () => {
  
  const{data:cartItems, updateCart, loading, deleteCart, fetchData:fetchCart} = useCart()
  const{createTransaction}= useTransaction()
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); 
  const [paymentProof, setPaymentProof] = useState(null);  // State for payment proof
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
 
  useEffect(() => {
    


    // Ambil metode pembayaran dari API
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods", {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data.data || []))
      .catch((error) => console.error("Error fetching payment methods:", error));
  }, []);



 

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.activity.price * (item.quantity || 1), 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    await createTransaction(cartItems.map(item => item.id), selectedPaymentMethod)
    await fetchCart() 

   

    // const transactionData = {
    //   activities: cartItems.map((item) => ({
    //     activity_id: item.id,
    //     quantity: item.quantity,
    //   })),
    //   payment_method_id: selectedPaymentMethod,
    // };

    // // Create FormData object to include payment proof image
    // const formData = new FormData();
    // formData.append("transactionData", JSON.stringify(transactionData));
    // formData.append("paymentProof", paymentProof);  // Append the payment proof file

    // fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction", {
    //   method: "POST",
    //   headers: {
    //     apiKey: import.meta.env.VITE_API_KEY,
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: formData,  // Send the form data including the file
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     alert("Transaction successful!");
    //     navigate("/transactions");
    //   })
    //   .catch((error) => {
    //     console.error("Error creating transaction:", error);
    //     alert("Transaction failed!");
    //   });
  };

 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);  // Set the selected file to paymentProof state
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
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={(item.activity.imageUrls || [])[0]|| "https://via.placeholder.com/150"}
                    alt={item.activity.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="font-bold text-gray-800">{item.activity.name}</h2>
                    <p className="text-sm text-gray-600">Price: Rp {item.activity.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                    <p className="text-sm font-bold text-gray-600">
                      Total: Rp {(item.activity.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {updateCart(item.id, item.quantity-1)}}
                    className="px-3 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                    disabled={loading || item.quantity === 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {updateCart(item.id, item.quantity+1)}}
                    className="px-3 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
                    disabled={loading}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {deleteCart(item.id)}}
                    className="px-3 py-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                    disabled={loading}
                  >
                    Remove
                  </button>
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
          <div className="mt-6">
            <label htmlFor="payment-proof" className="block mb-2 text-sm font-medium text-gray-700">
              Upload Payment Proof
            </label>
            <input
              type="file"
              id="payment-proof"
              className="w-full px-4 py-2 border rounded-md"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between mt-6 space-x-4">
  <button
    onClick={handleCheckout}
    className="px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
  >
    Proceed to Checkout
  </button>
  <button
    
    className="px-6 py-3 text-white bg-red-500 rounded-full hover:bg-red-600"
  >
    Cancel
  </button>
</div>

        </div>
      )}
    </div>
  );
};

export default Cart;
