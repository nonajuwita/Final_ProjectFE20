// pages/Transactions/index.jsx
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const response = await fetch(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vbmE0QGdtYWlsLmNvbSIsInVzZXJJZCI6IjcyMzBkMmMyLTU0ZjEtNDZhNS04ZTQ4LWQ2YjQ3ZGEyN2M4NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3NDQ5Njc2fQ.SZlMq8VYrBkWDAGQF2FeWagqpMJ4QohLtFgm5_hon3w",
              },
            }
          );
      
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log("Transactions:", data);
          return data;
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
      

    fetchTransactions();
  }, []);

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="text-2xl font-bold">My Transactions</h1>
      {transactions.map((txn) => (
        <div key={txn.id} className="p-4 mt-4 border rounded">
          <h2 className="font-bold">Transaction ID: {txn.id}</h2>
          <p>Total: Rp {txn.total.toLocaleString()}</p>
          <p>Date: {new Date(txn.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
