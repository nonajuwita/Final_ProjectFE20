import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Profile from "./pages/Profile"; // ✅ Tambahkan import Profile
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar /> {/* ✅ Navbar tetap muncul di semua halaman */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banners />
                  <Category />
                  <Activities />
                  <Promo />
                </>
              }
            />
            <Route path="/categories/:id" element={<CategoryDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} /> {/* ✅ Tambahkan Route Profile */}
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
