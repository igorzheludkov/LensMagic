import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'fake' }),
  endpoints: () => ({}),
  tagTypes: ['posts'],
})

export default apiSlice
