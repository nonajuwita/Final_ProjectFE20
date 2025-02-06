// ProfileAdmin/index.jsx
import React, { useState, useEffect } from "react";

const ProfileAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "apiKey": "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data pengguna");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile Admin</h1>
      <div className="mt-4">
        <h2 className="text-xl">User Information</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.role}</p>
      </div>
    </div>
  );
};

export default ProfileAdmin;
