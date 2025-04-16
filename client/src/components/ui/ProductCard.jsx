import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    discount,
    rating,
    image,
    isNew,
    isBestSeller,
    category,
  } = product;

  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <div className="card group transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        {/* Product image */}
        <Link to={`/products/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isBestSeller && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              BEST SELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to wishlist"
          >
            <FiHeart className="text-primary-600" size={18} />
          </button>
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-primary-50 transition-colors"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="text-primary-600" size={18} />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <Link
          to={`/category/${category}`}
          className="text-xs text-primary-600 font-medium hover:underline"
        >
          {category}
        </Link>
        <Link to={`/products/${id}`} className="block mt-1">
          <h3 className="text-gray-900 font-medium text-lg hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="text-gray-900 font-bold text-lg">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="ml-2 text-gray-500 text-sm line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-gray-500 text-xs">(120 reviews)</span>
        </div>

        {/* Add to cart button */}
        <button className="mt-4 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
