import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, CreateCategoryRequest } from "@/types/category";

const BASE_URL = "https://testcase.myideasoft.com/admin-api";
const TOKEN = "AX5FTZ7UBAABUDT6XYYPW7LX";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    getCategory: builder.query<Category, number>({
      query: (id) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Categories", id }],
    }),

    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation<
      Category,
      { id: number; category: Category }
    >({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = api;
