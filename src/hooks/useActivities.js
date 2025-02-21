import { useState, useEffect } from "react";

const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities";
const API_KEY = import.meta.env.VITE_API_KEY;

export const useActivities = (token) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "apiKey": API_KEY }
      });
      const data = await response.json();
      setActivities(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (newActivity) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apiKey": API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newActivity),
      });

      const data = await response.json();
      setActivities([...activities, data.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateActivity = async (id, updatedActivity) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "apiKey": API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedActivity),
      });

      setActivities(activities.map((activity) => 
        activity.id === id ? { ...activity, ...updatedActivity } : activity
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteActivity = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "apiKey": API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      setActivities(activities.filter((activity) => activity.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return { activities, loading, error, createActivity, updateActivity, deleteActivity };
};
