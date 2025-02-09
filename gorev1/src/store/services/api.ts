import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API base URL'ini burada tanımlıyoruz
const BASE_URL = "https://testcase.myideasoft.com/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
