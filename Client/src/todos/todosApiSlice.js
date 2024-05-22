import apiSlice from "../app/apiSlice";

// Define API endpoints related to todos
const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Query endpoint to fetch todos
        getTodos: build.query({
            query: () => ({
                url: "/api/todos"
            }),
            // Tags provided by this endpoint for caching
            providesTags: ["Todos"]
        }),

        // Mutation endpoint to update a todo
        updateTodo: build.mutation({
            // Mutation query to update a todo
            query: (todo) => ({
                url: "/api/todos",
                method: "PUT",
                body: todo
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Todos"]
        }),

        // Mutation endpoint to mark a todo as complete
        updateTodoComplete: build.mutation({
            // Mutation query to mark a todo as complete by its ID
            query: (id) => ({
                url: "/api/todos/complete",
                method: "PUT",
                body: id

            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Todos"]
        }),

        // Mutation endpoint to create a new todo
        createTodo: build.mutation({
            // Mutation query to create a new todo
            query: (todo) => ({
                url: "/api/todos",
                method: "POST",
                body: todo
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Todos"]
        }),

        // Mutation endpoint to delete a todo
        deleteTodo: build.mutation({
            // Mutation query to delete a todo by its ID
            query: (id) => ({
                url: `/api/todos/${id}`,
                method: "DELETE"
            }),
            // Tags invalidated by this endpoint for cache invalidation
            invalidatesTags: ["Todos"]
        })
    })
})

export const { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoCompleteMutation, useUpdateTodoMutation } = todosApiSlice