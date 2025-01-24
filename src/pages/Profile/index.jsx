import React from "react";

const Profile = () => {
  const token = localStorage.getItem("token");

  // Simulasi data user dari token
  const user = token
    ? { name: "John Doe", email: "johndoe@example.com" }
    : null;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>
      {user ? (
        <div className="mt-6">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
