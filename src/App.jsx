import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Banners from "./components/Banners";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Activities from "./components/Activities";
import Promo from "./components/Promo";
import CategoryDetail from "./components/CategoryDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Transactions from "./pages/Transaction";
import TransactionDetail from "./pages/TransactionDetail";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin"; // Admin page import
import ProfileAdmin from "./pages/ProfileAdmin"; // ProfileAdmin page import
import UpdateForm from "./components/UpdateForm";// Update form page for editing items


import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import UpdateCategoryForm from "./pages/UpdateCategoryForm";
import AddCategories from "./pages/AddCategories";
import Updateactivities from "./pages/Updateactivities";
import UpdatePromo from "./pages/UpdatePromo";
import AddPromo from "./pages/AddPromo";
import UpdateBanner from "./pages/UpdateBanner";
import AddBanner from "./pages/AddBanner";
// ProtectedRoute component for role-based access control
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

              {/* Admin and ProfileAdmin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profileadmin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Activities />
                    <ProfileAdmin />
                  </ProtectedRoute>
                }
              />

<Route
  path="/updateform/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <UpdateForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/updatecategories/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <UpdateCategoryForm />
    </ProtectedRoute>
  }
/>
<Route 
path="/addCategories"
element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <AddCategories />
  </ProtectedRoute>
}
/>
<Route
  path="/updateactivities/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Updateactivities />
    </ProtectedRoute>
  }
/>
<Route
  path="/updatepromos/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <UpdatePromo />
    </ProtectedRoute>
  }
/>
<Route 
path="/addPromos"
element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <AddPromo />
  </ProtectedRoute>
}
/>
<Route
  path="/updatebanners/:id"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <UpdateBanner />
    </ProtectedRoute>
  }
/>
<Route 
path="/addCategories"
element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <AddBanner />
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
