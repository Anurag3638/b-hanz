import { useNavigate } from "react-router-dom";
// import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/auth";

export default function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Call your API here
    const res = await axios.post("/api/v1/auth/login", formData);
    if (res.data.success) {
      // alert(res.data.message);
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/account");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        method="post"
      >
        <h2 className="text-2xl font-bold mb-4 capitalize">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
}
