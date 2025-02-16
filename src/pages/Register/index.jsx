import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.passwordRepeat) {
      setMessage("Password dan Repeat Password harus sama!");
      setLoading(false);
      return;
    }

    const apiUrl =
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordRepeat: formData.passwordRepeat, // Perbaikan: tambahkan passwordRepeat
          role: formData.role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registrasi berhasil! Silakan login.");
        setFormData({
          name: "",
          email: "",
          password: "",
          passwordRepeat: "",
          role: "",
        });
      } else {
        setMessage(result.message || "Registrasi gagal.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
        {message && (
          <p className={`text-center mb-2 ${message.includes("berhasil") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Repeat Password</label>
            <input
              type="password"
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
