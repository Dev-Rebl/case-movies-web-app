import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie, IUpcomingResult, ITransformedUpcomingResult, IGenreResult, ITransformedGenreResult } from '@types'
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
                if(newItems.page > currentCache.page) {
                    return {
                        ...currentCache,
                        ...newItems,
                        results: [...currentCache.results, ...newItems.results]
                    }
                } else {
                    return currentCache
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },

        }),
        getMovieById: builder.query<IMovie, string | number>({
            query: (id) => `movie/${id}?api_key=${environment.API_KEY}`,
        }),
        getGenres: builder.query<ITransformedGenreResult, void>({
            query: () => `genre/movie/list?api_key=${environment.API_KEY}`,
            transformResponse: ({ genres }: IGenreResult) => {
                return {
                    genres: genres.reduce((acc, curr): any => {
                        return {
                            ...acc,
                            [curr.id]: curr
                        }
                    }, {})
                }
            },
        }),
    }),

})

export const {
    useGetUpcomingMoviesQuery,
    useGetMovieByIdQuery,
    useGetGenresQuery,
} = movieApi
