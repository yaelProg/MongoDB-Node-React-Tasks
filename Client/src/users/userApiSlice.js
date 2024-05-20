import apiSlice from "../app/apiSlice";
import DecodeToken from "../auth/decodeToken";
const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: "/api/users"
            }),
            providesTags: ["Users"]
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "/api/users",
                method: "PUT",
                body: user

            }),
            invalidatesTages: ["Users"]
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: "/api/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/api/users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice