import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await axios.post("/api/v1/auth/contact", formData);
      if (res.data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center mt-2">
            Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-2">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
