import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil token dari localStorage untuk cek autentikasi
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${id}`,
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        );
       
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.data || []); // Ensure data is an array, avoid undefined errors
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

  const handleAddToCart = (activity) => {
    if (!isAuthenticated) {
      alert("Anda harus login terlebih dahulu untuk menambahkan ke keranjang.");
      navigate("/login");
      return;
    }
  
    addToCart({
      id: activity.id,
      name: activity.title,
      price: activity.price,
      imageUrl: activity.imageUrls?.[0] || "https://via.placeholder.com/300x200",
      quantity: 1,
    });
  
    alert(`${activity.title} berhasil ditambahkan ke keranjang.`);
  };
  

  if (loading) {
    return <p className="my-8 text-center">Loading activities...</p>;
  }

  if (error) {
    return <p className="my-8 text-center text-red-500">Error: {error}</p>;
  }

  return (
    <section className="container px-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Activities in This Category
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative overflow-hidden shadow-xl group rounded-xl"
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${
                  activity.imageUrls?.[0] || "https://via.placeholder.com/300x200"
                })`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="relative z-10 p-6 text-center text-white">
              <h3 className="text-xl font-bold">
                {activity.title || "Activity Name"}
              </h3>
              <p className="mt-2">
                Price: Rp {activity.price.toLocaleString()}
              </p>
              <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
                onClick={() => handleAddToCart(activity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryDetail;
