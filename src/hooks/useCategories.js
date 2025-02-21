import { useState, useEffect } from "react";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories";
const API_KEY = import.meta.env.VITE_API_KEY;

export const useCategories = (token) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "apiKey": API_KEY }
      });
      const data = await response.json();
      setCategories(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const createCategory = async (newCategory) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apiKey": API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newCategory),
      });

      const data = await response.json();
      setCategories([...categories, data.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update Category
  const updateCategory = async (id, updatedCategory) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "apiKey": API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCategory),
      });

      setCategories(categories.map((category) => 
        category.id === id ? { ...category, ...updatedCategory } : category
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "apiKey": API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      setCategories(categories.filter((category) => category.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, createCategory, updateCategory, deleteCategory };
};
