import React, { useEffect, useState } from "react";
import useCategory from "../../hooks/useCategory.js";
import CategoryCard from "../../components/ui/CategoryCard.jsx";

const CategoriesData = () => {
  const category = useCategory();

  return (
    <div className="p-8">
      <h1 className="p-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {category?.map((category) => (
          <CategoryCard key={category?.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesData;
