import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vbmE0QGdtYWlsLmNvbSIsInVzZXJJZCI6IjcyMzBkMmMyLTU0ZjEtNDZhNS04ZTQ4LWQ2YjQ3ZGEyN2M4NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3NDQ5Njc2fQ.SZlMq8VYrBkWDAGQF2FeWagqpMJ4QohLtFgm5_hon3w",
            },
          }
        );

        setUser(response.data.data);
      } catch (error) {
        setError("Gagal mengambil data profil");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
      {user ? (
        <div className="text-center">
          <img
            src={user.profilePictureUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full border border-gray-300"
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
