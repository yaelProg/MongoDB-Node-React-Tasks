import apiSlice from "../app/apiSlice";
import DecodeToken from "../auth/decodeToken";
const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query({
            query: () => ({
                url: "/api/todos"
            }),
            providesTags: ["Todos"]
        }),
        updateTodo: build.mutation({
            query: (todo) => ({
                url: "/api/todos",
                method: "PUT",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        updateTodoComplete: build.mutation({
            query:(id) => ({
                url: "/api/todos/complete",
                method:"PUT",
                body: id
                
            }),
            invalidatesTags: ["Todos"]
        }),

        createTodo: build.mutation({
            query: (todo) => ({
                url: "/api/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTodo: build.mutation({
            query: (id) => ({
                url: `/api/todos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"]
        })
    })
})

export const { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoCompleteMutation, useUpdateTodoMutation } = todosApiSlice