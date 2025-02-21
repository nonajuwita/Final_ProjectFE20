import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTransaction } from "../../hooks/useTransaction";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Layout from "../../components/layout/Layout";

const Transactions = () => {
  const { data: transaction, loading, error } = useTransaction();
  const [token, setToken] = useLocalStorage("token", "");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading transactions: {error.message}</div>;
  }

  return (
    <Layout>
      <div className="container px-4 mx-auto my-8">
      {transaction && transaction.length > 0 ? (
        transaction.map((txn) => (
          <Link to={`/transaction/${txn.id}`} key={txn.id} className="block p-4 mt-4 border rounded">
            <h2 className="font-bold">Transaction ID: {txn.id}</h2>
            <p>Total: Rp {txn.totalAmount ? txn.totalAmount.toLocaleString() : 'N/A'}</p>
            <p>Date: {txn.createdAt ? new Date(txn.createdAt).toLocaleString() : 'N/A'}</p>
          </Link>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
    </Layout>
  );
};

export default Transactions;
