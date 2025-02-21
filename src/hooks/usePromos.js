import { useState, useEffect } from "react";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos";
const API_KEY = import.meta.env.VITE_API_KEY;

export const usePromos = (token) => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "apiKey": API_KEY }
      });
      const data = await response.json();
      setPromos(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return { promos, loading, error };
};
