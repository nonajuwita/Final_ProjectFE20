import React, { Suspense } from "react";
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
import Admin from "./pages/Admin"; // Pastikan ini sesuai struktur folder
import ProfileAdmin from "./pages/ProfileAdmin"; // Import halaman ProfileAdmin

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<><Banners /><Category /><Activities /><Promo /></>} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              {/* Tambahkan rute untuk ProfileAdmin */}
              <Route
                path="/profileadmin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Activities />
                    <ProfileAdmin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
