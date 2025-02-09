import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://testcase.myideasoft.com/admin-api";
const TOKEN = "AX5FTZ7UBAABUDT6XYYPW7LX";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${TOKEN}`);
    return headers;
  },
});
