import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPromo = () => {
  const navigate = useNavigate();

  // Initialize state with default values
  const [promo, setPromo] = useState({
    title: '',
    description: '',
    imageUrl: '',
    terms_condition: '',
    promo_code: '',
    promo_discount_price: '',
    minimum_claim_price: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setPromo({
      ...promo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOEB5YWh1LmNvbSIsInVzZXJJZCI6ImU2NDFlZDU4LTEzODEtNDQ1Ni05NDQ2LTE4ODAyNDVhNzIwNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODkwMzExM30.D5YhDKqjbzq_83CKcI2Q3FfVsaQ0QVL1yQgwxbk04DM'
        },
        body: JSON.stringify({
          title: promo.title,
          description: promo.description,
          imageUrl: promo.imageUrl,
          terms_condition: promo.terms_condition,
          promo_code: promo.promo_code,
          promo_discount_price: parseFloat(promo.promo_discount_price),
          minimum_claim_price: parseFloat(promo.minimum_claim_price)
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Promo added successfully!');
        navigate('/admin'); // Navigate to admin page after success
      } else {
        alert(`Failed to add promo: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding promo:', error);
      alert('An error occurred while adding the promo.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg sm:w-80 lg:w-2/5 xl:w-1/3">
        <h2 className="text-2xl font-bold text-center">Add Promo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={promo.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={promo.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={promo.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Terms and Conditions</label>
            <textarea
              name="terms_condition"
              value={promo.terms_condition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Promo Code</label>
            <input
              type="text"
              name="promo_code"
              value={promo.promo_code}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Promo Discount Price</label>
            <input
              type="number"
              name="promo_discount_price"
              value={promo.promo_discount_price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Minimum Claim Price</label>
            <input
              type="number"
              name="minimum_claim_price"
              value={promo.minimum_claim_price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Promo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPromo;
