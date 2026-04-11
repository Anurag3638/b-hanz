import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { TrendingUp, Users, ShoppingBag, DollarSign, AlertCircle, RefreshCw } from "lucide-react";

// Mock data for development/empty state
const MOCK_DATA = {
    summary: {
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        monthRevenue: 0,
        todayOrders: 0,
        newUsersMonth: 0,
        conversionRate: 0
    },
    ordersByStatus: [
        { _id: "pending", count: 0 },
        { _id: "processing", count: 0 },
        { _id: "shipped", count: 0 },
        { _id: "delivered", count: 0 },
        { _id: "canceled", count: 0 }
    ],
    topProducts: [],
    revenueByCategory: []
};

const MOCK_TREND = [
    { _id: "2024-04-01", revenue: 0 },
    { _id: "2024-04-02", revenue: 0 },
    { _id: "2024-04-03", revenue: 0 }
];

export default function AnalyticsDashboard() {
    const [dashboardData, setDashboardData] = useState(MOCK_DATA);
    const [revenueTrend, setRevenueTrend] = useState(MOCK_TREND);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("auth");
            const headers = token ? { Authorization: token } : {};

            console.log("Fetching dashboard data with headers:", { Authorization: token ? "***" : "none" });

            const [summaryRes, trendRes] = await Promise.all([
                axios.get("/api/analytics/dashboard-summary", { headers }).catch(e => {
                    console.warn("Dashboard summary fetch failed:", e.message);
                    return { data: MOCK_DATA };
                }),
                axios.get("/api/analytics/revenue-trend?period=daily", { headers }).catch(e => {
                    console.warn("Revenue trend fetch failed:", e.message);
                    return { data: { data: MOCK_TREND } };
                })
            ]);

            const responseData = summaryRes.data;
            setDashboardData(responseData || MOCK_DATA);
            setRevenueTrend(trendRes.data?.data || MOCK_TREND);
            setHasData(!!responseData?.summary);
            setError(null);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setDashboardData(MOCK_DATA);
            setRevenueTrend(MOCK_TREND);
            setError(null); // Don't show error, use mock data instead
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchDashboardData();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const { summary, ordersByStatus, topProducts, revenueByCategory } = dashboardData;

    // Colors for charts
    const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

    const KPICard = ({ icon: Icon, label, value, change, trend = "up" }) => (
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium">{label}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
                    {change && (
                        <p className={`text-sm mt-2 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                            {trend === "up" ? "↑" : "↓"} {change} from last month
                        </p>
                    )}
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="text-blue-600" size={24} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-2">Real-time insights and business metrics</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <RefreshCw size={20} />
                    Refresh
                </button>
            </div>

            {/* No Data Notice */}
            {!hasData && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800">
                        📊 <strong>No data yet.</strong> Start by adding products, users, and creating orders to see analytics.
                    </p>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={`$${summary.monthRevenue?.toFixed(2) || "0.00"}`}
                    change="Monthly"
                />
                <KPICard
                    icon={ShoppingBag}
                    label="Total Orders"
                    value={summary.totalOrders}
                    change={`${summary.todayOrders} today`}
                />
                <KPICard
                    icon={Users}
                    label="Total Users"
                    value={summary.totalUsers}
                    change={`${summary.newUsersMonth} new`}
                />
                <KPICard
                    icon={TrendingUp}
                    label="Conversion Rate"
                    value={`${summary.conversionRate}%`}
                    change="Orders per user"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders by Status */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Orders by Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={ordersByStatus}
                                dataKey="count"
                                nameKey="_id"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                            >
                                {ordersByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Revenue by Category & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue by Category */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueByCategory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                            <Bar dataKey="revenue" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
                    <div className="space-y-4">
                        {topProducts.map((product, idx) => (
                            <div key={idx} className="flex items-between justify-between pb-3 border-b">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {product.quantity} units sold
                                    </p>
                                </div>
                                <p className="font-bold text-gray-900">
                                    ${product.revenue?.toFixed(2) || "0.00"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
