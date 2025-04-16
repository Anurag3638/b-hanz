import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/account");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-8 w-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

      <h1 className="ml-4">Redirecting in ... {count} </h1>
    </div>
  );
};

export default Spinner;
