import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use this for navigation
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate(); // Use navigate hook for React Router v6

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        );

         

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="my-8 text-center">Loading categories...</p>;
  }

  if (error) {
    return <p className="my-8 text-center text-red-500">Error: {error}</p>;
  }

  // Calculate the current categories to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Handle the next page click
  const handleNextPage = () => {
    if (indexOfLastItem < categories.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle category click to navigate to detail page
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`); // Use updated route path
  };

  return (
    <section className="container px-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Discover Your Next Adventure
      </h1>
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)} // Navigate to the detail page on click
            className="relative overflow-hidden transition-all duration-300 ease-in-out transform shadow-xl cursor-pointer group rounded-xl hover:scale-105"
          >
            <div
              className="absolute inset-0 transition-all duration-500 ease-in-out bg-center bg-cover"
              style={{
                backgroundImage: `url(${cat.imageUrl || "https://via.placeholder.com/300x200"})`, // Corrected here
              }}
            ></div>
            <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="relative z-10 p-6 text-center text-white">
              <h3 className="text-xl font-bold group-hover:underline">{cat.name || "Category"}</h3>
            </div>
          </div>
        ))}

        {/* Pagination - Back Button */}
        {currentPage > 1 && (
          <button
            className="absolute left-0 p-2 text-3xl text-white transition duration-300 transform translate-y-1/2 bg-blue-600 rounded-full bottom-1/2 hover:bg-blue-700"
            onClick={handlePrevPage}
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Pagination - Next Button */}
        {indexOfLastItem < categories.length && (
          <button
            className="absolute right-0 p-2 text-3xl text-white transition duration-300 transform translate-y-1/2 bg-blue-600 rounded-full bottom-1/2 hover:bg-blue-700"
            onClick={handleNextPage}
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </section>
  );
};

export default Category;
