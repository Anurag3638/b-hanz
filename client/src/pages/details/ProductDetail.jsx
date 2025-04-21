import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get("/api/data/search", {
        params: params,
      });
      setProduct(res?.data?.[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  const discountedPrice = product?.price
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : "0.00";

  console.log(product);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* Left Side - Images */}
      <div>
        <img
          src={mainImage}
          alt={product?.name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex gap-4 mt-4">
          {product?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
        <p className="text-gray-600 mb-4">{product?.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-semibold text-green-600">
            ₹{discountedPrice}
          </span>
          <span className="line-through text-gray-400">₹{product?.price}</span>
          <span className="text-red-500 font-medium">
            ({product?.discount}% OFF)
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Rating: ⭐ {product?.rating} / 5
          </p>
          <p className="text-sm text-gray-600">
            Stock: {product?.stock > 0 ? "In stock" : "Out of stock"}
          </p>
          {product?.isNew && (
            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              New Arrival
            </span>
          )}
          {product?.isBestSeller && (
            <span className="ml-2 inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
              Best Seller
            </span>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-6">
          {product?.specifications?.map((spec, idx) => (
            <li key={idx}>
              <strong>{spec.name}:</strong> {spec.value}
            </li>
          ))}
        </ul>

        <button
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          disabled={product?.stock <= 0}
        >
          {product?.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
