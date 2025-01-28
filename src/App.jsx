import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For routing
import Banners from "./components/Banners";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Activities from "./components/Activities";
import Promo from "./components/Promo";
import CategoryDetail from "./components/Categorydetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart"; // Menambahkan import Cart

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar dan Banners hanya ditampilkan di halaman utama dan kategori */}
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
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/register" element={<Register />} /> {/* Register route */}
          <Route path="/cart" element={<Cart />} /> {/* Route Cart */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
