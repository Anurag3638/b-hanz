import React, { use, useEffect, useState } from "react";
import useCategory from "../../hooks/useCategory.js";
import CategoryCard from "../../components/ui/CategoryCard.jsx";
import axios from "axios";

const CategoriesData = () => {
  const category = useCategory();
  const [ok, setOk] = useState(false);
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      img: formData.get("img"),
    };
    try {
      const res = await axios.post("/api/data/create-category", data);
      console.log(res.data);
      setOk(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setOk(true)}
        className="mb-4 bg-primary-600 text-white p-2 rounded hover:bg-primary-700 transition duration-300"
      >
        <span>Add Category</span>
      </button>
      {ok ? (
        <form className="flex flex-col gap-4 p-4" onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Category Name"
            className="border border-gray-300 p-2 rounded"
            name="name"
          />
          <input
            type="text"
            name="img"
            placeholder="IMG URL"
            className="border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-primary-600 text-white p-2 rounded hover:bg-primary-700 transition duration-300"
          >
            Add Category
          </button>
        </form>
      ) : (
        ""
      )}
      <h1 className="p-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {category?.map((category) => (
          <CategoryCard key={category?.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesData;
