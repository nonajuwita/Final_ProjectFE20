import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePromo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize state with default values, avoiding undefined
  const [promo, setPromo] = useState({
    title: '',
    description: '',
    imageUrl: '',
    terms_condition: '',
    promo_code: '',
    promo_discount_price: '',
    minimum_claim_price: ''
  });

  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        const selectedPromo = data.data.find(p => p.id === id);
        if (selectedPromo) {
          setPromo({
            title: selectedPromo.title || '',
            description: selectedPromo.description || '',
            imageUrl: selectedPromo.imageUrl || '',
            terms_condition: selectedPromo.terms_condition || '',
            promo_code: selectedPromo.promo_code || '',
            promo_discount_price: selectedPromo.promo_discount_price || '',
            minimum_claim_price: selectedPromo.minimum_claim_price || ''
          });
        }
      } catch (error) {
        console.error('Error fetching promo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromo();
  }, [id]);

  const handleChange = (e) => {
    setPromo({
      ...promo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOEB5YWh1LmNvbSIsInVzZXJJZCI6ImU2NDFlZDU4LTEzODEtNDQ1Ni05NDQ2LTE4ODAyNDVhNzIwNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODkwMzExM30.D5YhDKqjbzq_83CKcI2Q3FfVsaQ0QVL1yQgwxbk04DM'  // Replace with actual token
        },
        body: JSON.stringify({
          title: promo.title,
          description: promo.description,
          imageUrl: promo.imageUrl,
          terms_condition: promo.terms_condition,
          promo_code: promo.promo_code,
          promo_discount_price: promo.promo_discount_price,
          minimum_claim_price: promo.minimum_claim_price
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Promo updated successfully!');
        navigate('/admin');
      } else {
        alert(`Failed to update promo: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating promo:', error);
      alert('An error occurred while updating the promo.');
    }
  };

  // Conditional rendering to ensure inputs are only shown once the data is loaded
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-96 lg:w-1/3 xl:w-1/4">
        <h2 className="text-2xl font-bold text-center">Update Promo</h2>
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
          >
            Update Promo
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePromo;
