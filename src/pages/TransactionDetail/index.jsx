// pages/Transactions/Detail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TransactionDetail = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/get-transaction/${transactionId}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vbmE0QGdtYWlsLmNvbSIsInVzZXJJZCI6IjcyMzBkMmMyLTU0ZjEtNDZhNS04ZTQ4LWQ2YjQ3ZGEyN2M4NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3NDQ5Njc2fQ.SZlMq8VYrBkWDAGQF2FeWagqpMJ4QohLtFgm5_hon3w",
            },
          }
        );

        const data = await response.json();
        setTransaction(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactionDetail();
  }, [transactionId]);

  if (!transaction) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="text-2xl font-bold">Transaction Detail</h1>
      <p className="mt-4"><strong>ID:</strong> {transaction.id}</p>
      <p><strong>Total:</strong> Rp {transaction.total.toLocaleString()}</p>
      <p><strong>Payment Method:</strong> {transaction.paymentMethod.name}</p>
      <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
      <h2 className="mt-4 text-lg font-bold">Activities:</h2>
      <ul>
        {transaction.activities.map((activity) => (
          <li key={activity.id} className="p-2 border-b">
            {activity.name} x {activity.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionDetail;
