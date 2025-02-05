import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Banners from "./components/Banners";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Activities from "./components/Activities";
import Promo from "./components/Promo";
import CategoryDetail from "./components/Categorydetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Transactions from "./pages/Transaction";
import TransactionDetail from "./pages/TransactionDetail";
import Profile from "./pages/Profile";
import AdminPage from "./pages/Admin"; // ✅ Tambah halaman Admin
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

// Fungsi untuk mendapatkan role dari localStorage
const getUserRole = () => {
  return localStorage.getItem("role");
};

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                role === "admin" ? <Navigate to="/admin" /> : (
                  <>
                    <Banners />
                    <Category />
                    <Activities />
                    <Promo />
                  </>
                )
              }
            />
            <Route path="/categories/:id" element={<CategoryDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
            
            {/* ✅ Hanya admin yang bisa akses halaman Admin */}
            <Route
              path="/admin"
              element={role === "admin" ? <AdminPage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
