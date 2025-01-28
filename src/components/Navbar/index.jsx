import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null; // Cek apakah user sudah login

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Arahkan pengguna ke halaman login
    navigate("/login");
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container flex items-center justify-between p-4 mx-auto">
          <div className="text-2xl font-bold text-blue-600">TravelNav</div>
          <div className="hidden space-x-6 md:flex">
            <a href="/" className="text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a href="/categories/1" className="text-gray-800 hover:text-blue-600">
              Destinations
            </a>
            <a href="/activities" className="text-gray-800 hover:text-blue-600">
              Activities
            </a>
            <a href="/bookings" className="text-gray-800 hover:text-blue-600">
              Bookings
            </a>
          </div>
          <div className="flex items-center space-x-4">
  {isLoggedIn ? (
    <>
      <a
        href="/profile"
        className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
      >
        Profile
      </a>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600"
      >
        Logout
      </button>
      <button
        onClick={() => navigate("/cart")}
        className="px-4 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18v18H3z"
          />
        </svg>
      </button>
    </>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
    >
      Login
    </button>
  )}
</div>

        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">
                Home
              </a>
              <a href="/categories/1" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">
                Destinations
              </a>
              <a href="/activities" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">
                Activities
              </a>
              <a href="/bookings" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">
                Bookings
              </a>
              {isLoggedIn && (
                <a
                  href="/profile"
                  className="block px-3 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Profile
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
