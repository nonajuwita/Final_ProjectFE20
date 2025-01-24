import React, { useState, useEffect } from "react";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
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
  }, []);

  if (loading) {
    return <p className="my-8 text-center">Loading activities...</p>;
  }

  if (error) {
    return <p className="my-8 text-center text-red-500">Error: {error}</p>;
  }

  const itemsPerRow = 3;
  const startIndex = (4 - 1) * itemsPerRow;
  const endIndex = startIndex + itemsPerRow;
  const activitiesToDisplay = showAll ? activities : activities.slice(startIndex, endIndex);

  return (
    <div>
      <section className="container px-4 mx-auto my-8">
        <div className="grid gap-6 md:grid-cols-3">
          {activitiesToDisplay.map((activity) => (
            <div
              key={activity.id}
              className="p-4 text-center transition-all transform bg-gray-100 rounded-xl hover:scale-105 hover:shadow-lg"
            >
              <img
                src={activity.imageUrls && activity.imageUrls[0] ? activity.imageUrls[0] : "https://placehold.co/300x200"}
                alt={activity.title}
                className="object-cover w-full h-40 mb-4 rounded-md"
              />
              <h3 className="mb-2 text-lg font-bold">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.city}, {activity.province}</p>
              <p className="text-lg font-semibold text-blue-800">Rp {activity.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Button to Show All Activities */}
        {!showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 text-white transition bg-blue-500 rounded-full hover:bg-blue-600"
            >
              See All Activities
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Activities;
