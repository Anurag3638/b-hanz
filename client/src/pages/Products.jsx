import { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import useCategory from "../hooks/useCategory";
import useProduct from "../hooks/useProduct";

const Products = () => {
  const categories = useCategory();
  const products = useProduct() ?? [];
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    sort: "recommended",
    rating: 0,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize filtered products with all products
  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery]);

  const applyFilters = () => {
    let result = [...products]; // Clone original

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result?.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (filters.category !== "all") {
      result = result?.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.price !== "all") {
      result = result?.filter((product) => {
        const price = product.price;
        switch (filters.price) {
          case "under25":
            return price < 25;
          case "25to50":
            return price >= 25 && price <= 50;
          case "50to100":
            return price > 50 && price <= 100;
          case "over100":
            return price > 100;
          default:
            return true;
        }
      });
    }

    if (filters.rating > 0) {
      result = result?.filter((product) => product.rating >= filters.rating);
    }

    // Sorting
    switch (filters.sort) {
      case "price-low-high":
        result?.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result?.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "rating":
        result?.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      price: "all",
      sort: "recommended",
      rating: 0,
    });
    setSearchQuery("");
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="lg:flex gap-8">
          {/* Filter Button (Mobile) */}
          <div className="mb-4 lg:hidden">
            <button
              onClick={toggleFilterMenu}
              className="flex items-center justify-center w-full py-3 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="mr-2" /> Filters
            </button>
          </div>

          {/* Filters (Sidebar) */}
          <div
            className={`lg:w-1/4 bg-white p-6 rounded-lg shadow-sm transition-all ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={filters.category === "all"}
                    onChange={() => handleFilterChange("category", "all")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="category-all" className="ml-2 text-gray-700">
                    All Categories
                  </label>
                </div>
                {categories?.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category._id}`}
                      name="category"
                      checked={filters.category === category._id}
                      onChange={() =>
                        handleFilterChange("category", category._id)
                      }
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="ml-2 text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Price</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-all"
                    name="price"
                    checked={filters.price === "all"}
                    onChange={() => handleFilterChange("price", "all")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="price-all" className="ml-2 text-gray-700">
                    All Prices
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-under25"
                    name="price"
                    checked={filters?.price === "under25"}
                    onChange={() => handleFilterChange("price", "under25")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="price-under25" className="ml-2 text-gray-700">
                    Under $25
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-25to50"
                    name="price"
                    checked={filters?.price === "25to50"}
                    onChange={() => handleFilterChange("price", "25to50")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="price-25to50" className="ml-2 text-gray-700">
                    $25 to $50
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-50to100"
                    name="price"
                    checked={filters?.price === "50to100"}
                    onChange={() => handleFilterChange("price", "50to100")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="price-50to100" className="ml-2 text-gray-700">
                    $50 to $100
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-over100"
                    name="price"
                    checked={filters?.price === "over100"}
                    onChange={() => handleFilterChange("price", "over100")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="price-over100" className="ml-2 text-gray-700">
                    Over $100
                  </label>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="rating-all"
                    name="rating"
                    checked={filters?.rating === 0}
                    onChange={() => handleFilterChange("rating", 0)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="rating-all" className="ml-2 text-gray-700">
                    All Ratings
                  </label>
                </div>
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      checked={filters?.rating === rating}
                      onChange={() => handleFilterChange("rating", rating)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="ml-2 text-gray-700 flex items-center"
                    >
                      {rating}+ Stars
                      <div className="flex ml-1">
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
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Close Button */}
            <div className="mt-6 lg:hidden">
              <button
                onClick={toggleFilterMenu}
                className="w-full py-2 bg-primary-600 text-white rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sorting & Results */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-3 sm:mb-0">
                <p className="text-gray-600">
                  Showing {filteredProducts?.length} results
                </p>
              </div>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-700">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    value={filters?.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown />
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try changing your search criteria or clear filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
