import React, { useState, useEffect } from "react";
import { Trash2, Check, AlertCircle, ShoppingBag, User, Package, TrendingUp } from "lucide-react";

export default function AdminNotifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "order",
            title: "New Order Received",
            message: "Order #ORD-2024-001 for $99.99",
            timestamp: new Date(Date.now() - 5 * 60000),
            read: false,
            icon: ShoppingBag
        },
        {
            id: 2,
            type: "user",
            title: "New User Registered",
            message: "John Doe just signed up",
            timestamp: new Date(Date.now() - 30 * 60000),
            read: false,
            icon: User
        },
        {
            id: 3,
            type: "product",
            title: "Low Stock Alert",
            message: "Product XYZ-123 stock is below 10 units",
            timestamp: new Date(Date.now() - 2 * 60 * 60000),
            read: true,
            icon: Package
        },
        {
            id: 4,
            type: "revenue",
            title: "Revenue Milestone",
            message: "You've reached $50,000 in monthly revenue!",
            timestamp: new Date(Date.now() - 24 * 60 * 60000),
            read: true,
            icon: TrendingUp
        }
    ]);

    const [filter, setFilter] = useState("all");

    const handleMarkAsRead = (id) => {
        setNotifications(
            notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const handleDelete = (id) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    const handleDeleteAll = () => {
        if (window.confirm("Delete all notifications?")) {
            setNotifications([]);
        }
    };

    const filteredNotifications = notifications.filter((n) => {
        if (filter === "unread") return !n.read;
        if (filter === "read") return n.read;
        return true;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    const getTypeColor = (type) => {
        const colors = {
            order: "bg-blue-100 text-blue-700",
            user: "bg-purple-100 text-purple-700",
            product: "bg-orange-100 text-orange-700",
            revenue: "bg-green-100 text-green-700"
        };
        return colors[type] || "bg-gray-100 text-gray-700";
    };

    const formatTime = (timestamp) => {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return timestamp.toLocaleDateString();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-2">System alerts and activity updates</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600 text-sm">Total Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600 text-sm">Unread</p>
                    <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600 text-sm">Read</p>
                    <p className="text-2xl font-bold text-green-600">
                        {notifications.length - unreadCount}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg transition ${filter === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("unread")}
                        className={`px-4 py-2 rounded-lg transition ${filter === "unread"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Unread ({unreadCount})
                    </button>
                    <button
                        onClick={() => setFilter("read")}
                        className={`px-4 py-2 rounded-lg transition ${filter === "read"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Read
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllAsRead}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    >
                        Mark All as Read
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                            <div
                                key={notification.id}
                                className={`bg-white p-4 rounded-lg shadow border-l-4 transition ${notification.read
                                        ? "border-gray-300"
                                        : "border-blue-600 bg-blue-50"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`p-3 rounded-lg flex-shrink-0 ${getTypeColor(notification.type)}`}>
                                        <Icon size={24} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {notification.title}
                                                    {!notification.read && (
                                                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </h3>
                                                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {formatTime(notification.timestamp)}
                                                </p>
                                            </div>

                                            {/* Type Badge */}
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getTypeColor(notification.type)}`}>
                                                {notification.type}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 mt-3">
                                            {!notification.read && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    <Check size={16} />
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(notification.id)}
                                                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm ml-auto"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
                        <p className="text-gray-600">No notifications</p>
                    </div>
                )}
            </div>
        </div>
    );
}
