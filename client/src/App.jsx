import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/Private";
import AdminRoute from "./components/routes/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import UsersData from "./pages/admin/UsersData";
import ProductsData from "./pages/admin/ProductsData";
import AddProduct from "./pages/admin/AddProduct";
import SearchItem from "./pages/SearchItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<SearchItem />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Route>

      {/* Protected Dashboard Route */}
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="" element={<AdminLayout />}>
          <Route path="users" element={<UsersData />} />
          <Route path="products" element={<ProductsData />} />
          <Route path="products/add-product" element={<AddProduct />} />
          {/* <Route path="orders" element={<OrdersData />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
