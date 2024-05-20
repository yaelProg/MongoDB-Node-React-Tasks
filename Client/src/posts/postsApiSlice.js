import apiSlice from "../app/apiSlice";
import DecodeToken from "../auth/decodeToken";

const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => ({
                url: "/api/posts"
            }),
            providesTags: ["Posts"]
        }),
        updatePost: build.mutation({
            query: (post) => ({
                url: "/api/posts",
                method: "PUT",
                body: post

            }),
            invalidatesTags: ["Posts"]
        }),


        createPost: build.mutation({
            query: (post) => ({
                url: "/api/posts",
                method: "POST",
                body: post
            }),
            invalidatesTags: ["Posts"]
        }),
        deletePost: build.mutation({
            query: (id) => ({
                url: `/api/posts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Posts"]
        })
    })
})

export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } = postsApiSlice