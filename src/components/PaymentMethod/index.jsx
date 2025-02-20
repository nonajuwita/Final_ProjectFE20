// components/PaymentMethod.jsx
import React, { useState, useEffect } from "react";

const PaymentMethod = ({ onSelect }) => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
              
            },
          }
        );
        const data = await response.json();
        setMethods(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    onSelect(method); // Kirim ke parent
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Choose Payment Method:</h2>
      <ul>
        {methods.map((method) => (
          <li key={method.id} className="mb-2">
            <button
              className={`px-4 py-2 ${
                selectedMethod?.id === method.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => handleSelect(method)}
            >
              {method.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethod;
