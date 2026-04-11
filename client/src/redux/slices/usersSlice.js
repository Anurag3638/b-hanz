import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeaders = () => {
    const token = localStorage.getItem("auth");
    return token ? { Authorization: token } : {};
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/auth/users", {
                headers: getAuthHeaders()
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

export const blockUser = createAsyncThunk(
    "users/blockUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/auth/users/${userId}/block`,
                {},
                { headers: getAuthHeaders() }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to block user");
        }
    }
);

export const unblockUser = createAsyncThunk(
    "users/unblockUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/auth/users/${userId}/unblock`,
                {},
                { headers: getAuthHeaders() }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to unblock user");
        }
    }
);

const initialState = {
    users: [],
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Block User
        builder
            .addCase(blockUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((u) => u._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Unblock User
        builder
            .addCase(unblockUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(unblockUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((u) => u._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(unblockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
