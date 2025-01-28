import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banners from "./components/Banners";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Activities from "./components/Activities";
import Promo from "./components/Promo";
import CategoryDetail from "./components/CategoryDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import {AuthProvider}  from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";


const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
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
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
