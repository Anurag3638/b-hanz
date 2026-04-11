import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, AlertCircle, Edit2, Trash2, Eye, Plus } from "lucide-react";

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        image: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};
            const res = await axios.get("/api/products", { headers });
            setProducts(res.data.data || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.quantity) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};
            await axios.post("/api/products/create-product", formData, { headers });
            setShowAddForm(false);
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                quantity: "",
                image: ""
            });
            fetchProducts();
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Failed to add product");
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};
            await axios.delete(`/api/products/${productId}`, { headers });
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product");
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-600" size={24} />
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                    <p className="text-gray-600 mt-2">Manage inventory and product listings</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (USD) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows="3"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Add Product
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by product name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Product Image */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 p-4 flex items-center justify-center">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-40 object-contain"
                                />
                            ) : (
                                <div className="text-gray-400">No Image</div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                            </div>

                            {/* Pricing & Stock */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-gray-600">Price</p>
                                    <p className="font-bold text-lg text-gray-900">${product.price?.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Stock</p>
                                    <p
                                        className={`font-bold text-lg ${product.quantity > 10
                                                ? "text-green-600"
                                                : product.quantity > 0
                                                    ? "text-orange-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {product.quantity}
                                    </p>
                                </div>
                            </div>

                            {/* Category & Status */}
                            <div className="flex gap-2 flex-wrap">
                                {product.category && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                        {product.category}
                                    </span>
                                )}
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${product.quantity > 0
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t">
                                <button
                                    onClick={() =>
                                        setExpandedProduct(expandedProduct === product._id ? null : product._id)
                                    }
                                    className="flex-1 text-blue-600 hover:text-blue-800 py-2 flex items-center justify-center gap-1"
                                >
                                    <Eye size={16} /> View
                                </button>
                                <button className="flex-1 text-orange-600 hover:text-orange-800 py-2 flex items-center justify-center gap-1">
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="flex-1 text-red-600 hover:text-red-800 py-2 flex items-center justify-center gap-1"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedProduct === product._id && (
                            <div className="bg-gray-50 p-4 border-t space-y-2 text-sm">
                                <div>
                                    <p className="text-gray-600">Product ID</p>
                                    <p className="font-mono text-xs">{product._id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Created</p>
                                    <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Last Updated</p>
                                    <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-600">No products found</p>
                </div>
            )}
        </div>
    );
}
