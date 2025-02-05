import React from "react";
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
import AdminDashboard from "./pages/Admin"; // Import halaman Admin
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Banners />} />
            <Route path="/categories/:id" element={<CategoryDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:transactionId" element={<TransactionDetail />} />

            {/* Halaman Admin hanya untuk admin */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute roleRequired="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
