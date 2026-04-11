import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeaders = () => {
    const token = localStorage.getItem("auth");
    return token ? { Authorization: token } : {};
};

export const fetchDashboardData = createAsyncThunk(
    "analytics/fetchDashboardData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/analytics/dashboard-summary", {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
        }
    }
);

export const fetchRevenueTrend = createAsyncThunk(
    "analytics/fetchRevenueTrend",
    async (period = "daily", { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/analytics/revenue-trend?period=${period}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch revenue trend");
        }
    }
);

export const fetchUserAnalytics = createAsyncThunk(
    "analytics/fetchUserAnalytics",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/analytics/user-analytics", {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user analytics");
        }
    }
);

export const fetchOrderAnalytics = createAsyncThunk(
    "analytics/fetchOrderAnalytics",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/analytics/order-analytics", {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch order analytics");
        }
    }
);

export const fetchProductPerformance = createAsyncThunk(
    "analytics/fetchProductPerformance",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/analytics/product-performance", {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch product performance");
        }
    }
);

const initialState = {
    dashboardData: null,
    revenueTrend: [],
    userAnalytics: null,
    orderAnalytics: null,
    productPerformance: [],
    loading: false,
    error: null
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Dashboard Data
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardData = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Revenue Trend
        builder
            .addCase(fetchRevenueTrend.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRevenueTrend.fulfilled, (state, action) => {
                state.loading = false;
                state.revenueTrend = action.payload.data;
            })
            .addCase(fetchRevenueTrend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // User Analytics
        builder
            .addCase(fetchUserAnalytics.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.userAnalytics = action.payload;
            })
            .addCase(fetchUserAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Order Analytics
        builder
            .addCase(fetchOrderAnalytics.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrderAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.orderAnalytics = action.payload;
            })
            .addCase(fetchOrderAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Product Performance
        builder
            .addCase(fetchProductPerformance.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductPerformance.fulfilled, (state, action) => {
                state.loading = false;
                state.productPerformance = action.payload.data;
            })
            .addCase(fetchProductPerformance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
