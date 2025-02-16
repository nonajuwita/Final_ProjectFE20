import React, { useEffect, useState } from "react";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }

        const data = await response.json();
        setBanners(data.data); // Assuming API response has a 'data' field with an array of banners
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000); // Change banner every 5 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [banners]);

  if (loading) {
    return <p className="my-4 text-center">Loading banners...</p>;
  }

  if (error) {
    return <p className="my-4 text-center text-red-500">Error: {error}</p>;
  }

  if (banners.length === 0) {
    return <p className="my-4 text-center">No banners available</p>;
  }

  const currentBanner = banners[currentBannerIndex];

  return (
    <section
      className="relative w-full mx-auto overflow-hidden"
      style={{
        width: currentBanner.width || "100%",
        height: currentBanner.height || "500px",
        maxWidth: "100%",
        backgroundImage: `url(${currentBanner.imageUrl || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">
          {currentBanner.title || "Discover the World"}
        </h1>
        <p className="mb-6 text-xl md:text-2xl">
          {currentBanner.description || "Your journey starts here."}
        </p>
        <button className="px-10 py-4 font-semibold text-blue-600 transition bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-100 hover:scale-105">
          {currentBanner.buttonText || "Get Started"}
        </button>
      </div>

      <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              index === currentBannerIndex
                ? "bg-white scale-125"
                : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Banners;
