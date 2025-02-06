import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateForm = () => {
  const { id } = useParams(); // This can be used if necessary, but not required for updating by name
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // other fields you want to allow updating
  });

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk'; // Replace this with actual token retrieval method

  // Fetch the profile details (with the token)
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`, {
          method: 'POST', // Using POST for fetching profile details
          headers: {
            'Authorization': `Bearer ${token}`,
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setItem(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          // populate other fields if necessary
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile');
      }
    };

    fetchItem();
  }, [token]); // Trigger when token changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`, {
        method: 'POST', // Use POST to update profile with token
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
        body: JSON.stringify(formData), // Send the updated name and email in the body
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const data = await response.json();
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateForm;
