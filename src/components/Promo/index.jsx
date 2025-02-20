import React, { useState, useEffect } from "react";

const Promo = () => {
  const [promos, setPromos] = useState([]); // State to store promo data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
          headers: {
            apiKey: import.meta.env.VITE_API_KEY,
          },
        });
        

        if (!response.ok) {
          throw new Error("Failed to fetch promos");
        }

        const data = await response.json();
        setPromos(data.data); // Set the fetched promos to state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError(error.message); // Handle error
        setLoading(false); // Stop loading if there is an error
      }
    };

    fetchPromos(); // Call the function to fetch promos
  }, []);

  if (loading) {
    return <p className="my-8 text-center">Loading promos...</p>; // Show loading text
  }

  if (error) {
    return <p className="my-8 text-center text-red-500">Error: {error}</p>; // Show error message
  }

  return (
    <section className="container px-4 mx-auto my-8">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Promo Menarik Untuk Anda
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {promos.slice(0, 4).map((promo) => ( // Limit to 4 promos
          <div
            key={promo.id}
            className="overflow-hidden transition transform bg-blue-100 shadow-lg rounded-xl hover:scale-105"
          >
            <img
              src={promo.imageUrl} // Use the imageUrl from the promo object
              alt={promo.title}
              className="object-cover w-full h-48"
            />
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold">{promo.title}</h3>
              <p className="mb-4 text-gray-700">{promo.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Promo Code:</strong> {promo.promo_code}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Discount:</strong> Rp{promo.promo_discount_price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Terms & Conditions:</strong> <span dangerouslySetInnerHTML={{ __html: promo.terms_condition }} />
              </p>
              <button className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                Lihat Promo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button to see all promos */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
          Lihat Semua Promo
        </button>
      </div>
    </section>
  );
};

export default Promo;
