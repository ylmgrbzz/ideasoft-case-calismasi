import { createApi } from "@reduxjs/toolkit/query/react";
import { Product, CreateProductRequest } from "../../types/product";
import { baseQuery } from "./baseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: number; product: CreateProductRequest }
    >({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
