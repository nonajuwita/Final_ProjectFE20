import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState({
    name: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();

        // Menemukan banner dengan ID yang cocok
        const selectedBanner = data.data.find(b => b.id === id);

        if (selectedBanner) {
          setBanner({
            name: selectedBanner.name,
            imageUrl: selectedBanner.imageUrl
          });
        } else {
          console.error('Banner not found');
          alert('Banner not found');
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, [id]);

  const handleChange = (e) => {
    setBanner({
      ...banner,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`, {
        method: 'POST',  // Menggunakan POST
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOUB5YWh1LmNvbSIsInVzZXJJZCI6IjYwMjcwNjI1LTcyZjYtNDlkYS05MDVmLTcwMDI2NzA5YTM4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODg5OTAzM30.ghCMbte3J-6oqC9ynGicqgrfFF7HZvqnbBHGwaCwgpU',
        },
        body: JSON.stringify({
          name: banner.name,
          imageUrl: banner.imageUrl
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Banner updated successfully!');
        navigate('/admin');
      } else {
        alert(`Failed to update banner: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('An error occurred while updating the banner.');
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Update Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Banner Name</label>
          <input
            type="text"
            name="name"
            value={banner.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={banner.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Banner
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
