import apiSlice from "../app/apiSlice";

// Define API endpoints related to posts
const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Query endpoint to fetch posts
        getPosts: build.query({
            query: () => ({
                url: "/api/posts"
            }),
            // Tags provided by this endpoint for caching
            providesTags: ["Posts"]
        }),

        // Mutation endpoint to update a post
        updatePost: build.mutation({
            // Mutation query to update a post
            query: (post) => ({
                url: "/api/posts",
                method: "PUT",
                body: post

            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Posts"]
        }),

        // Mutation endpoint to create a new post
        createPost: build.mutation({
            // Mutation query to create a new post
            query: (post) => ({
                url: "/api/posts",
                method: "POST",
                body: post
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Posts"]
        }),

        // Mutation endpoint to delete a post
        deletePost: build.mutation({
            // Mutation query to delete a post by its ID
            query: (id) => ({
                url: `/api/posts/${id}`,
                method: "DELETE"
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Posts"]
        })
    })
})

export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } = postsApiSlice