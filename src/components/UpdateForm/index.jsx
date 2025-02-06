import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateForm = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    // other fields you want to allow updating
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/item/${id}`, {
          headers: {
            'Authorization': 'Bearer YOUR_AUTH_TOKEN',
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        const data = await response.json();
        setItem(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          // populate other fields if necessary
        });
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/item/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item');
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Update {item.name}</h2>
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
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateForm;
