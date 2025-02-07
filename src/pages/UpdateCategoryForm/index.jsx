import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        const selectedCategory = data.data.find(cat => cat.id === id);
        if (selectedCategory) {
          setCategory({
            name: selectedCategory.name,
            imageUrl: selectedCategory.imageUrl
          });
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOUB5YWh1LmNvbSIsInVzZXJJZCI6IjYwMjcwNjI1LTcyZjYtNDlkYS05MDVmLTcwMDI2NzA5YTM4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODg5OTAzM30.ghCMbte3J-6oqC9ynGicqgrfFF7HZvqnbBHGwaCwgpU'
        },
        body: JSON.stringify({
          name: category.name,
          imageUrl: category.imageUrl
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Category updated successfully!');
        navigate('/admin');
      } else {
        alert(`Failed to update category: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('An error occurred while updating the category.');
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Update Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={category.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
