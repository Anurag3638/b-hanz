import axios from "axios";

// Create axios instance with token support
const createAxiosInstance = () => {
    return axios.create({
        baseURL: "/api",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

// Get authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("auth");
    return {
        Authorization: token || ""
    };
};

// Dashboard API calls
export const analyticsAPI = {
    getDashboardSummary: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/analytics/dashboard-summary", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Dashboard summary API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    getRevenueTrend: async (period = "daily") => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get(
                `/analytics/revenue-trend?period=${period}`,
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Revenue trend API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    getUserAnalytics: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/analytics/user-analytics", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("User analytics API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    getOrderAnalytics: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/analytics/order-analytics", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Order analytics API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    getProductPerformance: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/analytics/product-performance", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Product performance API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }
};

// Orders API calls
export const ordersAPI = {
    getAllOrders: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/orders", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Get orders API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    updateOrderStatus: async (orderId, status) => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.put(
                `/orders/${orderId}/status`,
                { status },
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Update order status API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    cancelOrder: async (orderId) => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.put(
                `/orders/${orderId}/cancel`,
                {},
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Cancel order API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }
};

// Users API calls
export const usersAPI = {
    getAllUsers: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/auth/users", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Get users API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    blockUser: async (userId) => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.put(
                `/auth/users/${userId}/block`,
                {},
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Block user API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    unblockUser: async (userId) => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.put(
                `/auth/users/${userId}/unblock`,
                {},
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Unblock user API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }
};

// Products API calls
export const productsAPI = {
    getAllProducts: async () => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.get("/products", {
                headers: getAuthHeaders()
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Get products API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    createProduct: async (productData) => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.post(
                "/products/create-product",
                productData,
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Create product API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    },

    deleteProduct: async (productId) => {
        try {
            const instance = createAxiosInstance();
            const response = await instance.delete(
                `/products/${productId}`,
                { headers: getAuthHeaders() }
            );
            return { success: true, data: response.data };
        } catch (error) {
            console.warn("Delete product API error:", error.message);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }
};

export default {
    analyticsAPI,
    ordersAPI,
    usersAPI,
    productsAPI
};
