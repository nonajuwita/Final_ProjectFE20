import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto text-white bg-gray-800">
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3 md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="mb-2 text-xl font-bold text-blue-400">TravelNav</h3>
            <p className="text-gray-300">Your trusted travel companion</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="mb-2 font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-1">
              <a href="/" className="text-gray-300 hover:text-blue-400">Home</a>
              <a href="/destinations" className="text-gray-300 hover:text-blue-400">Destinations</a>
              <a href="/activities" className="text-gray-300 hover:text-blue-400">Activities</a>
              <a href="/contact" className="text-gray-300 hover:text-blue-400">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="mb-2 font-semibold">Contact Us</h4>
            <p className="text-gray-300">Email: info@travelnav.com</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 mt-6 text-sm text-center text-gray-400 border-t border-gray-700">
          <p>&copy; {currentYear} TravelNav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;