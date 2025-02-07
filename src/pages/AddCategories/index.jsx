import { useState } from "react";

const AddCategories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the length of each field
    if (name.length > 255 || description.length > 255 || imageUrl.length > 255) {
      setLoading(false);
      setError("Each field must be less than 255 characters.");
      return;
    }

    const response = await fetch(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apiKey": "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmppOUB5YWh1LmNvbSIsInVzZXJJZCI6IjYwMjcwNjI1LTcyZjYtNDlkYS05MDVmLTcwMDI2NzA5YTM4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODg5OTAzM30.ghCMbte3J-6oqC9ynGicqgrfFF7HZvqnbBHGwaCwgpU"
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
        }),
      }
    );

    const data = await response.json();
    setLoading(false);
    if (data.errors) {
      setError(data.errors);
    } else {
      alert(data.message || "Kategori berhasil ditambahkan!");
      setName("");
      setDescription("");
      setImageUrl("");
      setError(""); // Clear error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Tambah Kategori</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Nama Kategori</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Deskripsi</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">URL Gambar</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Menambahkan..." : "Tambah Kategori"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
