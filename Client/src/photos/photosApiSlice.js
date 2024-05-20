import apiSlice from "../app/apiSlice";
import DecodeToken from "../auth/decodeToken";
const photosApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPhotos: build.query({
            query: () => ({
                url: "/api/photos"
            }),
            providesTags: ["Photos"]
        }),
        updatePhoto: build.mutation({
            query: (photo) => ({
                url: "/api/photos",
                method: "PUT",
                body: photo

            }),
            invalidatesTags: ["Photos"]
        }),

        createPhoto: build.mutation({
            query: (photo) => ({
                url: "/api/photos",
                method: "POST",
                body: photo
            }),
            invalidatesTags: ["Photos"]
        }),
        deletePhoto: build.mutation({
            query: (id) => ({
                url: `/api/photos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Photos"]
        })
    })
})

export const { useGetPhotosQuery, useCreatePhotoMutation, useDeletePhotoMutation, useUpdatePhotoMutation } = photosApiSlice