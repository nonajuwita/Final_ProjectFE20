import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTransaction } from "../../hooks/useTransaction";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Layout from "../../components/layout/Layout";
import axios from "axios";

const Transactions = () => {
  const { data: transaction, loading, error } = useTransaction();
  const [token, setToken] = useLocalStorage("token", "");

  // Fungsi untuk membatalkan transaksi menggunakan API baru
  const handleCancelTransaction = async (id) => {
    if (!id) {
      alert("ID transaksi tidak valid.");
      return;
    }
  
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cancel-transaction/${id}`,
        {}, // Body kosong karena API tidak memerlukan data tambahan
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: import.meta.env.VITE_API_KEY,
          },
        }
      );
  
      if (response.data.status === "OK") {
        alert("Transaksi berhasil dibatalkan!");
      } else {
        alert("Gagal membatalkan transaksi");
      }
    } catch (error) {
      console.error("Error membatalkan transaksi:", error);
      alert("Gagal membatalkan transaksi: " + (error.response?.data?.message || error.message));
    }
  };
  

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
            <div key={txn.id} className="block p-4 mt-4 border rounded">
              <h2 className="font-bold">Transaction ID: {txn.id}</h2>
              <p>Total: Rp {txn.totalAmount ? txn.totalAmount.toLocaleString() : 'N/A'}</p>
              <p>Date: {txn.createdAt ? new Date(txn.createdAt).toLocaleString() : 'N/A'}</p>
              <p className="text-sm text-gray-600">
                Status: <span className={`font-semibold ${txn.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>{txn.status}</span>
              </p>

              {/* Button untuk menuju halaman detail transaksi */}
              <Link to={`/transaction/${txn.id}`}>
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Detail Transaction
                </button>
              </Link>

              {/* Button untuk membatalkan transaksi */}
              {txn.status !== "canceled" && (
                <button
                  onClick={() => handleCancelTransaction(txn.id)}
                  className="px-6 py-2 mt-4 ml-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Cancel Transaction
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </Layout>
  );
};

export default Transactions;
