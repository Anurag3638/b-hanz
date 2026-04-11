import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: localStorage.getItem("darkMode") === "true" || false,
    sidebarOpen: localStorage.getItem("sidebarOpen") !== "false" || true,
    notifications: [],
    toast: null
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", state.darkMode);
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
            localStorage.setItem("sidebarOpen", state.sidebarOpen);
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            );
        },
        showToast: (state, action) => {
            state.toast = action.payload;
        },
        hideToast: (state) => {
            state.toast = null;
        }
    }
});

export const {
    toggleDarkMode,
    toggleSidebar,
    addNotification,
    removeNotification,
    showToast,
    hideToast
} = uiSlice.actions;

export default uiSlice.reducer;
