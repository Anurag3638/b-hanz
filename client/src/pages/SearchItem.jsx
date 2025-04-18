import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";

const SearchItem = () => {
  const params = useParams();
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/data/search?slug=${params.slug}`);
      setResults(res?.data.search);
      console.log(res?.data.search);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div>
      <ProductCard key={results?._id} product={results} />
    </div>
  );
};

export default SearchItem;
