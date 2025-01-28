import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for getting URL params

const CategoryDetail = () => {
  const { id } = useParams(); // Get the category ID from URL params
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]); // Run the effect when the category ID changes

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
          <div key={activity.id} className="relative overflow-hidden shadow-xl group rounded-xl">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${activity.imageUrl || "https://via.placeholder.com/300x200"})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="relative z-10 p-6 text-center text-white">
              <h3 className="text-xl font-bold">{activity.name || "Activity Name"}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryDetail;
