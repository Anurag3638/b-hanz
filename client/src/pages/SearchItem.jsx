import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";

const SearchItem = () => {
  const params = useParams();
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/data/search?slug=${params.slug}`);
      setResults(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div>
      {results?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {results?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-xl font-semibold">
          No results found for "{params.slug}"
        </div>
      )}
    </div>
  );
};

export default SearchItem;
