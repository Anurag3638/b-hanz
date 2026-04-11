import Order from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';

// Get Dashboard Analytics Summary
export const getDashboardSummary = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        // Total metrics
        const totalUsers = await userModel.countDocuments();
        const totalProducts = await productModel.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Today's metrics
        const todayOrders = await Order.countDocuments({
            createdAt: { $gte: today }
        });

        const todayRevenue = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: today },
                    paymentStatus: "completed"
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$finalAmount" }
                }
            }
        ]);

        // This month metrics
        const monthRevenue = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: thisMonth },
                    paymentStatus: "completed"
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$finalAmount" }
                }
            }
        ]);

        // Order status breakdown
        const ordersByStatus = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Top products
        const topProducts = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    name: { $first: "$products.name" },
                    quantity: { $sum: "$products.quantity" },
                    revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
                }
            },
            { $sort: { revenue: -1 } },
            { $limit: 5 }
        ]);

        // Revenue by category
        const revenueByCategory = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.category",
                    revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { revenue: -1 } }
        ]);

        // New users this month
        const newUsersMonth = await userModel.countDocuments({
            createdAt: { $gte: thisMonth }
        });

        res.status(200).send({
            success: true,
            summary: {
                totalUsers,
                totalProducts,
                totalOrders,
                todayOrders,
                todayRevenue: todayRevenue[0]?.total || 0,
                monthRevenue: monthRevenue[0]?.total || 0,
                newUsersMonth,
                conversionRate: totalUsers > 0 ? ((totalOrders / totalUsers) * 100).toFixed(2) : 0
            },
            ordersByStatus,
            topProducts,
            revenueByCategory
        });
    } catch (error) {
        console.error("Error fetching dashboard summary:", error);
        res.status(500).send({
            success: false,
            message: "Error fetching dashboard summary",
            error: error.message
        });
    }
};

// Get Revenue Trend (Daily, Weekly, Monthly)
export const getRevenueTrend = async (req, res) => {
    try {
        const { period = "daily" } = req.query; // daily, weekly, monthly

        let groupBy;
        if (period === "daily") {
            groupBy = {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            };
        } else if (period === "weekly") {
            groupBy = {
                $week: "$createdAt"
            };
        } else {
            groupBy = {
                $month: "$createdAt"
            };
        }

        const trend = await Order.aggregate([
            {
                $match: {
                    paymentStatus: "completed"
                }
            },
            {
                $group: {
                    _id: groupBy,
                    revenue: { $sum: "$finalAmount" },
                    orders: { $sum: 1 },
                    avgOrderValue: { $avg: "$finalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).send({
            success: true,
            period,
            data: trend
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching revenue trend",
            error: error.message
        });
    }
};

// Get User Analytics
export const getUserAnalytics = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const userGrowth = await userModel.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    newUsers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const adminCount = await userModel.countDocuments({ role: 1 });
        const userCount = await userModel.countDocuments({ role: 0 });

        res.status(200).send({
            success: true,
            userGrowth,
            adminCount,
            userCount,
            totalUsers: adminCount + userCount
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching user analytics",
            error: error.message
        });
    }
};

// Get Order Analytics
export const getOrderAnalytics = async (req, res) => {
    try {
        const lastThirtyDays = new Date();
        lastThirtyDays.setDate(lastThirtyDays.getDate() - 30);

        const dailyOrders = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastThirtyDays }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    orders: { $sum: 1 },
                    revenue: { $sum: "$finalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const statusBreakdown = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).send({
            success: true,
            dailyOrders,
            statusBreakdown
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching order analytics",
            error: error.message
        });
    }
};

// Get Product Performance
export const getProductPerformance = async (req, res) => {
    try {
        const performance = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    name: { $first: "$products.name" },
                    totalSold: { $sum: "$products.quantity" },
                    totalRevenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } },
                    avgPrice: { $avg: "$products.price" }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);

        res.status(200).send({
            success: true,
            performance
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching product performance",
            error: error.message
        });
    }
};
