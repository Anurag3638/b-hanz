import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-primary-500">
              B-hanz
            </Link>
            <p className="text-gray-400 mt-2">
              Your one-stop shop for all your shopping needs. Quality products
              at affordable prices.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest products and offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} OrangeCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
