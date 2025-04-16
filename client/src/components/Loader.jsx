import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-8 w-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
