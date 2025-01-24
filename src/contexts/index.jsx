import React, { useState } from 'react';

const TravelWebApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { name: 'Beach', icon: '🏖️', bg: 'bg-gradient-to-r from-blue-400 to-teal-500' },
    { name: 'Mountain', icon: '⛰️', bg: 'bg-gradient-to-r from-green-400 to-blue-500' },
    { name: 'City', icon: '🏙️', bg: 'bg-gradient-to-r from-purple-400 to-pink-500' },
    { name: 'Cultural', icon: '🏛️', bg: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
  ];

  const activities = [
    { name: 'Hiking', price: 50, image: '⛺', color: 'bg-green-100' },
    { name: 'Snorkeling', price: 75, image: '🏊', color: 'bg-blue-100' },
    { name: 'City Tour', price: 40, image: '🚶', color: 'bg-purple-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container flex items-center justify-between p-4 mx-auto">
          <div className="text-2xl font-bold text-blue-600">TravelNow</div>
          <div className="hidden space-x-6 md:flex">
            <a href="#" className="text-gray-800 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-800 hover:text-blue-600">Destinations</a>
            <a href="#" className="text-gray-800 hover:text-blue-600">Activities</a>
            <a href="#" className="text-gray-800 hover:text-blue-600">Bookings</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">Login</button>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-white md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">Destinations</a>
              <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">Activities</a>
              <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-blue-100">Bookings</a>
            </div>
          </div>
        )}
      </nav>

      {/* Rest of the previous content remains the same - Banner and other sections */}
      <section className="relative pt-16">
        <div className="py-20 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Explore Amazing Destinations</h1>
          <p className="mb-8 text-xl">Discover the world with TravelNow</p>
          <button className="px-8 py-3 font-semibold text-blue-600 transition bg-white rounded-full hover:bg-blue-100">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 mx-auto my-8">
        <div className="flex justify-center space-x-6">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => setActiveCategory(cat.name)}
              className={`
                cursor-pointer transform transition-all duration-300 
                ${activeCategory === cat.name ? 'scale-110 shadow-xl' : 'hover:scale-105'}
                ${cat.bg} text-white rounded-xl p-4 text-center w-36
              `}
            >
              <span className="block mb-2 text-4xl">{cat.icon}</span>
              <h3 className="font-bold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section className="container px-4 mx-auto my-8">
        <div className="grid gap-6 md:grid-cols-3">
          {activities.map((activity) => (
            <div 
              key={activity.name} 
              className={`
                ${activity.color} rounded-xl p-6 transform transition-all 
                hover:scale-105 hover:shadow-lg text-center
              `}
            >
              <span className="block mb-4 text-6xl">{activity.image}</span>
              <h3 className="mb-2 text-xl font-bold">{activity.name}</h3>
              <p className="text-2xl font-semibold text-blue-800">${activity.price}</p>
              <button className="px-6 py-2 mt-4 text-white transition bg-blue-500 rounded-full hover:bg-blue-600">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-12 text-center text-white bg-gradient-to-r from-pink-500 to-red-500">
        <h2 className="mb-4 text-4xl font-bold">Summer Mega Sale!</h2>
        <p className="mb-6 text-xl">Get 30% OFF on all packages</p>
        <button className="px-8 py-3 text-lg font-bold text-red-600 transition bg-white rounded-full hover:bg-gray-100">
          Claim Offer
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-white bg-gray-900">
        <div className="container mx-auto text-center">
          <p>© 2024 TravelNow. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TravelWebApp;