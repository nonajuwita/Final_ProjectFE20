import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const AddBanner = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const [token, setToken]=useLocalStorage("token","");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the length of each field
    if (name.length > 255 || imageUrl.length > 255) {
      setLoading(false);
      setError("Each field must be less than 255 characters.");
      return;
    }

    const response = await fetch(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner", // Assuming the endpoint is for creating banners
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apiKey": import.meta.env.VITE_API_KEY,
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          imageUrl,
        }),
      }
    );

    const data = await response.json();
    setLoading(false);
    if (data.errors) {
      setError(data.errors);
    } else {
      alert(data.message || "Banner berhasil ditambahkan!");
      setName("");
      setImageUrl("");
      setError(""); // Clear error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Tambah Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Nama Banner</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            {loading ? "Menambahkan..." : "Tambah Banner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
