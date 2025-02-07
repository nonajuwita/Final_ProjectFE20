import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk',
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        const selectedUser = data.data.find(user => user.id === id);
        if (selectedUser) {
          setUser({
            name: selectedUser.name,
            email: selectedUser.email
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
        body: JSON.stringify({
          id,
          name: user.name,
          email: user.email
        }),
      });

      if (response.ok) {
        alert('User updated successfully!');
        navigate('/admin');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;