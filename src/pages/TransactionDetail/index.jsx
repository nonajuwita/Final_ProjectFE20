import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TransactionDetail = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dapatkan token dari localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    const fetchTransactionDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/get-transaction/${transactionId}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("Transaction Detail Response:", data); // Debugging

        if (!response.ok || !data.data) {
          throw new Error(`Error ${response.status}: ${data.message || "Failed to fetch transaction details"}`);
        }

        setTransaction(data.data);
      } catch (err) {
        console.error("Error fetching transaction detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transactionId, token, navigate]);

  if (loading) return <p className="text-center">Loading transaction details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="text-2xl font-bold text-center">Transaction Detail</h1>
      {transaction ? (
        <div className="p-6 mt-6 border rounded shadow-md">
          <p><strong>ID:</strong> {transaction.id}</p>
          <p><strong>Total:</strong> Rp {transaction.total.toLocaleString()}</p>
          <p><strong>Payment Method:</strong> {transaction.paymentMethod?.name || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>

          <h2 className="mt-4 text-lg font-bold">Activities:</h2>
          <ul className="mt-2 space-y-2">
            {transaction.activities?.map((activity) => (
              <li key={activity.id} className="p-2 border-b">
                {activity.name} x {activity.quantity}
              </li>
            )) || <p>No activities found.</p>}
          </ul>

          <button
            onClick={() => navigate("/transactions")}
            className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Back to Transactions
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">No transaction details available.</p>
      )}
    </div>
  );
};

export default TransactionDetail;
