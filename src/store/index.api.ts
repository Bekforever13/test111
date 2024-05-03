import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL }),
  refetchOnFocus: false,
  tagTypes: ['products'],
  endpoints: (build) => ({
    default: build.query({
      query: () => 'default',
    }),
  }),
})
