import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propertiesAPI = createApi({
  reducerPath: 'propertiesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4001/' }),
  endpoints: (builder) => ({
    getProperties: builder.query({
        query: () => `properties/`,
      }),
    getPropertyById: builder.query({
      query: (id) => `properties/${id}`,
    }),
  }),
})


export const { useGetPropertiesQuery, useGetPropertyByIdQuery } = propertiesAPI