import { useState, useEffect } from "react";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners";
const API_KEY = import.meta.env.VITE_API_KEY;

export const useBanners = (token) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "apiKey": API_KEY }
      });
      const data = await response.json();
      setBanners(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return { banners, loading, error };
};
