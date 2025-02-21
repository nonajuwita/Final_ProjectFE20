import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTransaction } from "../../hooks/useTransaction";

const Transactions = () => {

  // const [transactions, setTransactions] = useState([]);
  const {data:transaction, loading}=useTransaction()

  
   const [token, setToken]=useLocalStorage("token","");


  

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="text-2xl font-bold">My Transactions</h1>
      {transaction.length > 0 ? (
        transaction.map((txn) => (
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
