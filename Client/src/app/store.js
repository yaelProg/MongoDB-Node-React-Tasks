import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSliceReducer from "../auth/authSlice"

// Configure the Redux store using Redux Toolkit
const store = configureStore({
    // Define reducers for different slices of the store
    reducer: {
        auth: authSliceReducer,  // Authentication slice reducer
        [apiSlice.reducerPath]: apiSlice.reducer // API slice reducer
    },
    // Extend middleware to include API slice middleware for handling API requests
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // Enable Redux DevTools for debugging (change to false when deploying)
    devTools: true
})
export default store