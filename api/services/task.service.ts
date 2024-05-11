import { api } from "../api.config";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (task) => ({
        url: "task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    getTasks: builder.query({
      query: () => ({
        url: "task/user",
        method: "GET",
      }),
    }),

    editTask: builder.mutation({
      query: (task) => ({
        url: `task/${task.id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    updateTaskStatus: builder.mutation({
      query: (task) => ({
        url: `task/${task.id}/status`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} = tasksApi;
