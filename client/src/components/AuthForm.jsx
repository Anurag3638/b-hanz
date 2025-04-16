import { useState } from "react";

export default function AuthForm({ type = "login", onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    ...(type === "signup" && { name: "" }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4 capitalize">{type}</h2>
      {type === "signup" && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input"
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="input"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 w-full"
      >
        {type === "signup" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
}
