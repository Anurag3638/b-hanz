import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "./slices/analyticsSlice";
import ordersReducer from "./slices/ordersSlice";
import usersReducer from "./slices/usersSlice";
import productsReducer from "./slices/productsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        analytics: analyticsReducer,
        orders: ordersReducer,
        users: usersReducer,
        products: productsReducer,
        ui: uiReducer
    }
});

export default store;
