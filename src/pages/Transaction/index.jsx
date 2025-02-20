import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [token, setToken]=useLocalStorage("token","");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              apiKey: import.meta.env.VITE_API_KEY,
              Authorization:`Bearer ${token}`
                },
          }
        );

        if (!response.ok) {
          const errorMessage = `Error ${response.status}: ${response.statusText}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Transactions Data:", data);
        setTransactions(data.data || []); // Pastikan data disimpan di state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="text-2xl font-bold">My Transactions</h1>
      {transactions.length > 0 ? (
        transactions.map((txn) => (
          <div key={txn.id} className="p-4 mt-4 border rounded">
            <h2 className="font-bold">Transaction ID: {txn.id}</h2>
            <p>Total: Rp {txn.total ? txn.total.toLocaleString() : 'N/A'}</p>
            <p>Date: {txn.createdAt ? new Date(txn.createdAt).toLocaleString() : 'N/A'}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
