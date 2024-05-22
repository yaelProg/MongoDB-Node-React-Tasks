import { createSlice } from "@reduxjs/toolkit";

// Create a slice to manage authentication state in the Redux store
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem("token") || "", // Initialize token from localStorage or empty string
        isUserLoggedIn: localStorage.getItem("token") ? true : false, // Check if user is logged in based on token presence
        userFullName: "" // Placeholder for user's full name
    },
    reducers: {
        // Reducer function to set token and update login status in state
        setToken: (state, action) => {
            const token = action.payload.accessToken
            state.token = token;
            state.isUserLoggedIn = true
            localStorage.setItem("token", token);
            localStorage.setItem("role", action.payload.role)
        },
        // Reducer function to remove token and update login status in state
        removeToken: (state, action) => {
            state.token = ""
            state.isUserLoggedIn = false
            state.role = "" // Consider adding state for role here
            localStorage.removeItem("token")
            localStorage.removeItem("role")
        }
    }
})

export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions