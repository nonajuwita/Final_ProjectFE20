import React, { useState } from "react";
import CheckoutForm from "../../components/CheckoutForm";
import Transactions from "../Transactions";

const CheckoutPage = () => {
  const [transactions, setTransactions] = useState([]);

  const handleTransactionSuccess = (newTransaction) => {
    // Tambahkan transaksi baru ke daftar transaksi
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="text-2xl font-bold">Checkout Page</h1>
      <CheckoutForm
        cartItems={[
          { id: "activity1", quantity: 1 },
          { id: "activity2", quantity: 2 },
        ]}
        onTransactionSuccess={handleTransactionSuccess}
      />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default CheckoutPage;
