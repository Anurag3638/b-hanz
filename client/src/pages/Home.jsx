import { Link } from "react-router-dom";
import HeroSlider from "../components/ui/HeroSlider";
import ProductCard from "../components/ui/ProductCard";
import CategoryCard from "../components/ui/CategoryCard";
import { heroSlides } from "../data/data.js";
import { FiArrowRight } from "react-icons/fi";
// import axios from "axios";
// import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct.js";
import useCategory from "../hooks/useCategory.js";

const Home = () => {
  const products = useProduct();
  const categories = useCategory();
  const newArrivals = products?.filter((product) => product.isNew);
  const bestSellers = products?.filter((product) => product.isBestSeller);
  const specialOffers = products?.filter((product) => product.discount > 0);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/categories"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              View all categories <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.map((category) => (
              <CategoryCard key={category?.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              View all products <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="text-4xl font-bold mb-4">
                Summer Sale Up to 50% Off
              </h2>
              <p className="text-xl mb-8">
                Take advantage of our biggest sale of the season. Limited time
                only.
              </p>
              <Link
                to="/sales/summer"
                className="inline-block bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Shop Now
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Summer Sale"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <Link
              to="/new-arrivals"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              View all new arrivals <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {newArrivals?.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
            <Link
              to="/best-sellers"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              View all best sellers <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bestSellers?.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Special Offers</h2>
            <Link
              to="/special-offers"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
            >
              View all offers <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {specialOffers?.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest products, exclusive offers, and
              shopping tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
