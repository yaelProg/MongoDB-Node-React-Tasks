import apiSlice from "../app/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (registerUser) => ({
                url: "/api/auth/register",
                method: "POST",
                body: registerUser
            })
        }),
        login: build.mutation({
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