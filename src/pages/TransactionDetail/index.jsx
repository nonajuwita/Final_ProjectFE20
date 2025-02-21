import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTransaction } from "../../hooks/useTransaction";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const TransactionDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useTransaction();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [paymentFile, setPaymentFile] = useState(null);
  const [paymentFilePreview, setPaymentFilePreview] = useState(null); // State untuk preview file
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [token] = useLocalStorage("token", "");

  // Ambil API key dari environment variable
  const yourApiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (data && data.length > 0) {
      // Mencari transaksi berdasarkan ID
      const detail = data.find((txn) => txn.id === id);
      setTransactionDetail(detail);
    }
  }, [data, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPaymentFile(file);
    if (file && file.type.startsWith("image")) {
      setPaymentFilePreview(URL.createObjectURL(file)); // Menyimpan URL sementara untuk gambar
    } else {
      setPaymentFilePreview(null); // Jika bukan gambar, tidak menampilkan preview
    }
  };

  const handleUpload = async () => {
    if (!paymentFile) {
      alert("Silakan pilih file bukti pembayaran.");
      return;
    }
  
    const formData = new FormData();
    // Ganti "file" dengan "image" agar sesuai dengan API
    formData.append("image", paymentFile);
  
    try {
      setUploading(true);
      setUploadSuccess(false);
  
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data && response.data.status === "OK") {
        setUploadSuccess(true);
        alert("Bukti pembayaran berhasil diunggah!");
      } else {
        alert("Gagal mengunggah bukti pembayaran.");
      }
      
    } catch (error) {
      console.error("Error mengunggah bukti pembayaran:", error);
      alert("Gagal mengunggah bukti pembayaran");
    } finally {
      setUploading(false);
    }
  };
  

  const updateTransactionStatus = async (newStatus) => {
    try {
      // Permintaan API untuk memperbarui status transaksi
      await axios.put(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transactions/${id}`,
        { status: newStatus },
        {
          headers: {
            apiKey: yourApiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactionDetail((prevDetail) => ({
        ...prevDetail,
        status: newStatus, // Memperbarui status secara lokal
      }));
      alert("Status berhasil diperbarui!");
    } catch (error) {
      console.error("Error memperbarui status:", error);
      alert("Gagal memperbarui status");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="p-4 text-blue-600 bg-blue-100 rounded-lg animate-pulse">
              Loading...
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container px-4 mx-auto">
          <div className="p-4 text-red-600 bg-red-100 rounded-lg">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  if (!transactionDetail) {
    return (
      <Layout>
        <div className="container px-4 mx-auto">
          <div className="p-4 text-yellow-600 bg-yellow-100 rounded-lg">Transaksi tidak ditemukan</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Detail Transaksi</h1>
              <span className="px-4 py-2 text-sm text-yellow-700 bg-yellow-100 rounded-full">
                {transactionDetail.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">ID Transaksi</p>
                <p className="text-lg font-medium text-gray-800">{transactionDetail.id}</p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-600">Total Jumlah</p>
                <p className="text-2xl font-bold text-blue-700">
                  Rp {transactionDetail.totalAmount?.toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Tanggal Transaksi</p>
                <p className="text-lg font-medium text-gray-800">
                  {new Date(transactionDetail.createdAt).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Metode Pembayaran</span>
                <span className="font-medium">{transactionDetail.payment_method?.name}</span>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>Status</span>
                <span className="font-medium text-green-600">{transactionDetail.status}</span>
              </div>
            </div>
          </div>

          {/* Bagian Upload Pembayaran */}
          <div className="p-6 mt-8 bg-white shadow-lg rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Unggah Bukti Pembayaran</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {/* Menampilkan preview file jika ada */}
            {paymentFilePreview && (
              <div className="mt-4 text-center">
                <img
                  src={paymentFilePreview}
                  alt="Preview"
                  className="object-cover w-32 h-32 mx-auto rounded-lg"
                />
              </div>
            )}
            <div className="mt-4 text-center">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`px-6 py-2 text-sm ${uploading ? "bg-gray-300" : "bg-blue-600"} hover:bg-blue-700 text-white rounded-lg`}
              >
                {uploading ? "Mengunggah..." : "Unggah Bukti Pembayaran"}
              </button>
            </div>
            {uploadSuccess && (
              <div className="mt-4 text-center text-green-600">
                Bukti pembayaran berhasil diunggah!
              </div>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 text-sm text-blue-600 transition-colors duration-200 bg-blue-100 rounded-lg hover:bg-blue-200"
            >
              Cetak Kwitansi
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionDetail;
