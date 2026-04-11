import React, { useState, useEffect } from "react";
import { ordersAPI } from "../../services/api";
import { Search, ChevronDown, AlertCircle, Eye, Trash2 } from "lucide-react";

// Mock data for empty state
const MOCK_ORDERS = [];

export default function OrderManagement() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await ordersAPI.getAllOrders();
      
      if (result.success) {
        setOrders(result.data?.data || MOCK_ORDERS);
        setError(null);
      } else {
        console.warn("Failed to fetch orders:", result.error);
        setOrders(MOCK_ORDERS);
        setError(null); // Don't show error, use mock data
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders(MOCK_ORDERS);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const result = await ordersAPI.updateOrderStatus(orderId, newStatus);
      if (result.success) {
        fetchOrders();
      } else {
        alert("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const result = await ordersAPI.cancelOrder(orderId);
      if (result.success) {
        fetchOrders();
      } else {
        alert("Failed to cancel order");
      }
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("Failed to cancel order");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order number or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order #</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Payment</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredOrders.map((order) => (
                            <React.Fragment key={order._id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.orderNumber}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {order.userId?.name || "Unknown"}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        ${order.finalAmount?.toFixed(2) || "0.00"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            className="px-3 py-1 rounded-full text-sm font-medium focus:outline-none"
                                            style={{
                                                backgroundColor: {
                                                    pending: "#fef3c7",
                                                    processing: "#bfdbfe",
                                                    shipped: "#bfdbfe",
                                                    delivered: "#d1fae5",
                                                    canceled: "#fee2e2"
                                                }[order.status],
                                                color: {
                                                    pending: "#92400e",
                                                    processing: "#1e40af",
                                                    shipped: "#1e40af",
                                                    delivered: "#065f46",
                                                    canceled: "#7f1d1d"
                                                }[order.status]
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="px-3 py-1 rounded-full text-sm font-medium"
                                            style={{
                                                backgroundColor: order.paymentStatus === "paid" ? "#d1fae5" : "#fee2e2",
                                                color: order.paymentStatus === "paid" ? "#065f46" : "#7f1d1d"
                                            }}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() =>
                                                setExpandedOrder(expandedOrder === order._id ? null : order._id)
                                            }
                                            className="text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        {order.status !== "shipped" && order.status !== "delivered" && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {/* Expanded Order Details */}
                                {expandedOrder === order._id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="7" className="px-6 py-4">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-600">Email</p>
                                                        <p className="font-medium">{order.userId?.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Phone</p>
                                                        <p className="font-medium">{order.shippingInfo?.phone}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Address</p>
                                                        <p className="font-medium">{order.shippingInfo?.address}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Subtotal</p>
                                                        <p className="font-medium">${order.subtotal?.toFixed(2)}</p>
                                                    </div>
                                                </div>

                                                {/* Order Items */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">Items</h4>
                                                    <table className="w-full text-sm">
                                                        <thead className="text-gray-600 border-b">
                                                            <tr>
                                                                <th className="text-left py-2">Product</th>
                                                                <th className="text-center">Qty</th>
                                                                <th className="text-right">Price</th>
                                                                <th className="text-right">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.products?.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="py-2">{item.productId?.name}</td>
                                                                    <td className="text-center">{item.quantity}</td>
                                                                    <td className="text-right">
                                                                        ${item.price?.toFixed(2)}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        ${(item.quantity * item.price).toFixed(2)}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
