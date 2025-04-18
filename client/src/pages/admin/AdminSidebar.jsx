import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="hover:text-yellow-400">
          Dashboard
        </Link>
        <Link to="/admin/users" className="hover:text-yellow-400">
          Users
        </Link>
        <Link to="/admin/products" className="hover:text-yellow-400">
          Products
        </Link>
        <Link to="/admin/categories" className="hover:text-yellow-400">
          Categories
        </Link>
        <Link to="/admin/orders" className="hover:text-yellow-400">
          Orders
        </Link>
      </nav>
    </div>
  );
}
