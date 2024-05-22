import apiSlice from "../app/apiSlice";

// Define API endpoints related to photos
const photosApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Query endpoint to fetch photos
        getPhotos: build.query({
            query: () => ({
                url: "/api/photos"
            }),
            // Tags provided by this endpoint for caching
            providesTags: ["Photos"]
        }),

        // Mutation endpoint to update a photo
        updatePhoto: build.mutation({
            // Mutation query to update a photo
            query: (photo) => ({
                url: "/api/photos",
                method: "PUT",
                body: photo
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Photos"]
        }),

        // Mutation endpoint to create a new photo
        createPhoto: build.mutation({
            // Mutation query to create a new photo
            query: (photo) => ({
                url: "/api/photos",
                method: "POST",
                body: photo
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Photos"]
        }),

        // Mutation endpoint to delete a photo
        deletePhoto: build.mutation({
            // Mutation query to delete a photo by its ID
            query: (id) => ({
                url: `/api/photos/${id}`,
                method: "DELETE"
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Photos"]
        })
    })
})

export const { useGetPhotosQuery, useCreatePhotoMutation, useDeletePhotoMutation, useUpdatePhotoMutation } = photosApiSlice