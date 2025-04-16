import axios from "axios";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchItem = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/api/data/search?slug=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
        }
      );

      console.log("Search Results:", response); // You can update state or route instead
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div>
      <div className="relative flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        <button
          onClick={handleSearch}
          className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm hover:bg-primary-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
