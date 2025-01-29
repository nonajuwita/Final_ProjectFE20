import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulasi API call untuk mendapatkan data user
    setTimeout(() => {
      setUser({ name: "John Doe", email: "johndoe@example.com" });
    }, 1000);
  }, [token, navigate]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>
      {user ? (
        <div className="mt-6 text-center">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
