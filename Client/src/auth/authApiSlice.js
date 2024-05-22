import apiSlice from "../app/apiSlice";

// Inject API endpoints related to authentication using the provided build object
const authApiSlice = apiSlice.injectEndpoints({
    // Define endpoints for registration, login, and function token checks
    endpoints: (build) => ({
        // Define the query for registering a user
        register: build.mutation({
            query: (registerUser) => ({
                url: "/api/auth/register",
                method: "POST",
                body: registerUser
            })
        }),
        login: build.mutation({
            // Define the query for user login
            query: (loginData) => ({
                url: "/api/auth/login",
                method: "POST",
                body: loginData
            })
        }),
        functionToken: build.mutation({
            query: (checkToken) => ({
                url: "/api/functionToken/" + localStorage.getItem("token"),
                method: "GET",
                body: checkToken
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useFunctionTokenMutation } = authApiSlice