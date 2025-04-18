import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";

export default function ProductsData() {
  const products = useProduct();
  const category = useCategory();

  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <button
          onClick={() => navigate("add-product")}
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add product
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Update product
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete product
        </button>
      </div>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">category</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => {
                const categoryName = category?.find(
                  (cat) => cat._id === product.category
                );
                return (
                  <tr key={product._id}>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{categoryName?.name}</td>
                    <td className="py-2 px-4 border-b">{product.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
