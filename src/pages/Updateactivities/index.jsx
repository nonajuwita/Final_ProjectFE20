import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    imageUrls: [] // Change to an array
  });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
          headers: {
            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          }
        });
        const data = await response.json();
        const selectedActivity = data.data.find(act => act.id === id);
        if (selectedActivity) {
          setActivity({
            name: selectedActivity.name || '',
            description: selectedActivity.description || '',
            imageUrls: selectedActivity.imageUrls || [] // Adjusted to imageUrls
          });
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUrlsChange = (e) => {
    const urls = e.target.value.split(',').map(url => url.trim());
    setActivity({
      ...activity,
      imageUrls: urls
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOUB5YWh1LmNvbSIsInVzZXJJZCI6IjYwMjcwNjI1LTcyZjYtNDlkYS05MDVmLTcwMDI2NzA5YTM4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODg5OTAzM30.ghCMbte3J-6oqC9ynGicqgrfFF7HZvqnbBHGwaCwgpU'
        },
        body: JSON.stringify({
          name: activity.name,
          description: activity.description,
          imageUrls: activity.imageUrls
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Activity updated successfully!');
        navigate('/admin');
      } else {
        alert(`Failed to update activity: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('An error occurred while updating the activity.');
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Update Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Activity Name</label>
          <input
            type="text"
            name="name"
            value={activity.name || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={activity.description || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URLs (comma separated)</label>
          <input
            type="text"
            name="imageUrls"
            value={activity.imageUrls.join(', ')} // Display as comma separated string
            onChange={handleImageUrlsChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Activity
        </button>
      </form>
    </div>
  );
};

export default UpdateActivityForm;
