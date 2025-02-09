import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductQueryParams } from "../types/product";

const BASE_URL = "https://testcase.myideasoft.com/api";
const ACCESS_TOKEN = "AX5FTZ7UBAABUDT6XYYPW7LX";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductQueryParams>({
      query: (params) => ({
        url: "/products",
        params: {
          ...params,
          limit: params.limit || 20,
          page: params.page || 1,
        },
      }),
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    searchProducts: builder.query<
      Product[],
      { search: string } & Omit<ProductQueryParams, "q">
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        searchParams.append("q[name]", params.search);
        searchParams.append("limit", params.limit?.toString() || "20");
        searchParams.append("page", params.page?.toString() || "1");

        return {
          url: `/products?${searchParams.toString()}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} = api;
