import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const token = localStorage.getItem("token") || "";

  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setError("Token tidak ditemukan, silakan login ulang.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengambil data profil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container p-6 mx-auto my-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center">My Profile</h1>

      {error ? (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchUserProfile}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      ) : user ? (
        <div className="text-center">
          <img
            src={user.profilePictureUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 mx-auto border border-gray-300 rounded-full"
          />
          <p className="mt-4 text-lg">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
