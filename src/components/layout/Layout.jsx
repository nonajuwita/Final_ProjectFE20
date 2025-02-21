import React from 'react';
import Navbar from '../Navbar'; // sesuaikan path import

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-[72px]"> {/* sesuaikan dengan tinggi navbar */}
        {children}
      </main>
    </div>
  );
};

export default Layout;