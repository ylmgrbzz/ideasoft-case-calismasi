import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { Category, CreateCategoryRequest } from "../../types/category";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategory: builder.query<Category, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<
      Category,
      { id: number; category: CreateCategoryRequest }
    >({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
