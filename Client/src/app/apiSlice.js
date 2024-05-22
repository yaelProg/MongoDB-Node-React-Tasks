import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Create an API slice using Redux Toolkit for managing API requests
const apiSlice = createApi({
    reducerPath: "api",
    //Change url
    // Configure the base query settings for API requests
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2004/",
        credentials: 'include',
        // Custom function to modify request headers before sending the API request
        prepareHeaders: (headers, { getState }) => {
            // Retrieve the authentication token from the Redux store state
            const token = getState().auth.token
            // Add authorization header with bearer token if token is available
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            } return headers
        }
    }),
    // Define API endpoints within the endpoints function
    endpoints: () => ({})
})
export default apiSlice 