import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, AlertCircle, Eye, Lock, Unlock } from "lucide-react";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [expandedUser, setExpandedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};
            const res = await axios.get("/api/auth/users", { headers });
            setUsers(res.data.data || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUser = async (userId) => {
        if (!window.confirm("Are you sure you want to block this user?")) return;

        try {
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};
            await axios.put(
                `/api/auth/users/${userId}/block`,
                {},
                { headers }
            );
            fetchUsers();
        } catch (err) {
            console.error("Error blocking user:", err);
            alert("Failed to block user");
        }
    };

    const handleUnblockUser = async (userId) => {
        if (!window.confirm("Are you sure you want to unblock this user?")) return;

        try {
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};
            await axios.put(
                `/api/auth/users/${userId}/unblock`,
                {},
                { headers }
            );
            fetchUsers();
        } catch (err) {
            console.error("Error unblocking user:", err);
            alert("Failed to unblock user");
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === "all" || user.role === (roleFilter === "admin" ? 1 : 0);

        return matchesSearch && matchesRole;
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
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-2">Manage customer accounts and permissions</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredUsers.map((user) => (
                            <React.Fragment key={user._id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="px-3 py-1 rounded-full text-sm font-medium"
                                            style={{
                                                backgroundColor: user.role === 1 ? "#fce7f3" : "#e0e7ff",
                                                color: user.role === 1 ? "#831843" : "#312e81"
                                            }}
                                        >
                                            {user.role === 1 ? "Admin" : "User"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="px-3 py-1 rounded-full text-sm font-medium"
                                            style={{
                                                backgroundColor: user.isBlocked ? "#fee2e2" : "#d1fae5",
                                                color: user.isBlocked ? "#7f1d1d" : "#065f46"
                                            }}
                                        >
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        <button
                                            onClick={() =>
                                                setExpandedUser(expandedUser === user._id ? null : user._id)
                                            }
                                            className="text-blue-600 hover:text-blue-800"
                                            title="View details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        {user.isBlocked ? (
                                            <button
                                                onClick={() => handleUnblockUser(user._id)}
                                                className="text-green-600 hover:text-green-800"
                                                title="Unblock user"
                                            >
                                                <Unlock size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleBlockUser(user._id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Block user"
                                            >
                                                <Lock size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {/* Expanded User Details */}
                                {expandedUser === user._id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="6" className="px-6 py-4">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-600">User ID</p>
                                                        <p className="font-medium text-sm">{user._id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Phone</p>
                                                        <p className="font-medium">{user.phone || "N/A"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Address</p>
                                                        <p className="font-medium">{user.address || "N/A"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Total Orders</p>
                                                        <p className="font-medium">{user.orders?.length || 0}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Account Created</p>
                                                        <p className="font-medium">
                                                            {new Date(user.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Last Updated</p>
                                                        <p className="font-medium">
                                                            {new Date(user.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* User Activity */}
                                                <div className="border-t pt-4">
                                                    <h4 className="font-semibold text-gray-900 mb-2">Account Status</h4>
                                                    <div className="flex gap-6">
                                                        <div>
                                                            <span className="text-xs text-gray-600">Block Status</span>
                                                            <p className="font-medium">
                                                                {user.isBlocked ? "🔴 Blocked" : "🟢 Active"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-600">Email Verified</span>
                                                            <p className="font-medium">
                                                                {user.isEmailVerified ? "✓ Yes" : "✗ No"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-600">Admin Access</span>
                                                            <p className="font-medium">
                                                                {user.role === 1 ? "✓ Yes" : "✗ No"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No users found</p>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {users.filter((u) => !u.isBlocked).length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-600 text-sm">Admins</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {users.filter((u) => u.role === 1).length}
                    </p>
                </div>
            </div>
        </div>
    );
}
