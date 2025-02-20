import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
   const { role, isAuthenticated, logout} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
 
  



  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-blue-600">TravelNav</Link>

        {/* Menu Desktop, hanya tampil untuk user biasa */}
        {role !== "admin" && (
          <div className="hidden space-x-6 md:flex">
            <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/categories/1" className="text-gray-800 hover:text-blue-600">Destinations</Link>
            <Link to="/activities" className="text-gray-800 hover:text-blue-600">Activities</Link>
            <Link to="/bookings" className="text-gray-800 hover:text-blue-600">Bookings</Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          ☰
        </button>

        {/* Mobile Menu, hanya tampil untuk user biasa */}
        {role !== "admin" && isMenuOpen && (
          <div className="absolute left-0 w-full bg-white shadow-md top-14 md:hidden">
            <Link to="/" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/categories/1" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Destinations</Link>
            <Link to="/activities" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Activities</Link>
            <Link to="/bookings" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Bookings</Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Jika role pengguna adalah admin, tampilkan Admin Dashboard */}
              {role === "admin" && (
                <Link to="/admin" className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600">
                  Admin Dashboard
                </Link>
              )}
              
              {/* Profile hanya muncul untuk user biasa */}
              {role !== "admin" && (
                <Link to="/profile" className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600">
                  Profile
                </Link>
              )}
              
              {/* Tombol Cart hanya tampil untuk user biasa, tidak untuk admin */}
              {role !== "admin" && (
                <button onClick={() => navigate("/cart")} className="px-4 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600">
                  🛒
                </button>
              )}
              
              <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
