import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [token, setToken]=useLocalStorage("token","");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOUB5YWh1LmNvbSIsInVzZXJJZCI6IjYwMjcwNjI1LTcyZjYtNDlkYS05MDVmLTcwMDI2NzA5YTM4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODg5OTAzM30.ghCMbte3J-6oqC9ynGicqgrfFF7HZvqnbBHGwaCwgpU',
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        const selectedUser = data.data.find(user => user.id === id);
        if (selectedUser) {
          setUser({
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role
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
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`, {
        method: 'POST', // Gunakan PATCH jika API mendukung
        headers: {
          'Content-Type': 'application/json',
          "apiKey": import.meta.env.VITE_API_KEY,
          "Authorization":`Bearer ${token}`
          
        },
        body: JSON.stringify({
          role: user.role
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('User role updated successfully!');
        navigate('/admin');
      } else {
        alert(`Failed to update user role: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('An error occurred while updating user role.');
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
            disabled
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
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Role
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
