import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";

const ProductCategory = () => {
  const params = useParams();
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();

  const getProductsByCategory = async () => {
    try {
      const res = await axios.get(`/api/data/category/${params.slug}`);
      if (res?.data?.success) {
        setProducts(res?.data?.allProducts);
        setCategory(res?.data?.categorySearch);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 gap-8">
          {category?.name} {products?.length} Results found
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
