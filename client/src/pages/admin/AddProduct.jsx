import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([""]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [stock, setStock] = useState("");
  const [specifications, setSpecifications] = useState([
    { name: "", value: "" },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/data/categories");
        setCategories(res.data.categorySearch);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleAddImageField = () => setImages([...images, ""]);
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAddSpec = () =>
    setSpecifications([...specifications, { name: "", value: "" }]);
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        discount: parseFloat(discount),
        rating: parseFloat(rating),
        image,
        images,
        category,
        isNew,
        isBestSeller,
        stock: parseInt(stock),
        specifications,
      };
      const res = await axios.post("/api/data/add-product", productData);
      alert("Product added!");
      // Clear form (optional)
    } catch (err) {
      console.error("Product create error", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto h-[80vh] overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Main Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <div>
          <label className="block font-medium mb-1">Additional Images:</label>
          {images.map((img, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Image ${index + 1}`}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full mb-2 border px-3 py-2 rounded"
            />
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add Image Field
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
            Is New
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
            />
            Best Seller
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">Specifications:</label>
          {specifications.map((spec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Spec Name"
                value={spec.name}
                onChange={(e) =>
                  handleSpecChange(index, "name", e.target.value)
                }
                className="w-1/2 border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Spec Value"
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
                className="w-1/2 border px-2 py-1 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSpec}
            className="text-blue-600 text-sm hover:underline"
          >
            + Add Specification
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
