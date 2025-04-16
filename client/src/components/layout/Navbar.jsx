import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              B-hanz
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Products
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Search, User and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <Link
              to="/account"
              className="text-gray-700 hover:text-primary-600"
            >
              <FiUser size={20} />
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-primary-600 relative"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-gray-700 hover:text-primary-600 relative"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/account"
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
                <FiSearch className="absolute left-7 top-[13.5rem] text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
