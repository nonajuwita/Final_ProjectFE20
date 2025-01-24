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
import Profile from "./pages/Profile"; // Import Profile page

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> {/* Route baru */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
