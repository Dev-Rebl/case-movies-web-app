import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie, IUpcomingResult, ITransformedUpcomingResult } from '@types'
import { environment } from '@constants'

export const movieApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    getUpcomingMovies: builder.query<ITransformedUpcomingResult, number>({
      query: (page = 1) => `movie/upcoming?page=${page}&api_key=${environment.API_KEY}`,
      transformResponse: ({ page, total_pages, results }: IUpcomingResult) => {
        return {
          page,
          results,
          has_more_pages: page < total_pages,
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        return {
          ...currentCache,
          ...newItems,
          results: [...currentCache.results, ...newItems.results]
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },

    }),
    getMovieById: builder.query<IMovie, number>({
      query: (id) => `movie/${id}?api_key=${environment.API_KEY}`,
    }),
  }),

})

export const {
  useGetUpcomingMoviesQuery,
  useGetMovieByIdQuery
} = movieApi
