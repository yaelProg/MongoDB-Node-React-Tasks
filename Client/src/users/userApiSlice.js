import apiSlice from "../app/apiSlice";

// Define API endpoints related to users
const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Query endpoint to fetch users
        getUsers: build.query({
            query: () => ({
                url: "/api/users"
            }),
            // Tags provided by this endpoint for caching
            providesTags: ["Users"]
        }),

        // Mutation endpoint to update a user
        updateUser: build.mutation({
            // Mutation query to update a user
            query: (user) => ({
                url: "/api/users",
                method: "PUT",
                body: user

            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTages: ["Users"]
        }),

        // Mutation endpoint to create a new user
        createUser: build.mutation({
            // Mutation query to create a new user
            query: (user) => ({
                url: "/api/users",
                method: "POST",
                body: user
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Users"]
        }),

        // Mutation endpoint to delete a user
        deleteUser: build.mutation({
            // Mutation query to delete a user by its ID
            query: (id) => ({
                url: `/api/users/${id}`,
                method: "DELETE"
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Users"]
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice