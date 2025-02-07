import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`, {
        headers: { 'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c' },
      });
      const data = await response.json();
      setCategory(data.data);
    };

    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
      body: JSON.stringify(category),
    });

    if (response.ok) {
      alert('Category updated successfully!');
      navigate('/admin');
    } else {
      alert('Failed to update category');
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Update Category</h2>
      <form onSubmit={handleUpdate}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>
        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            value={category.imageUrl}
            onChange={(e) => setCategory({ ...category, imageUrl: e.target.value })}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>
        <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
