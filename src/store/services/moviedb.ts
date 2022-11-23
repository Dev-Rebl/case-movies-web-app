import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovie, IPaginatedResult, ITransformedPaginatedResult, IGenreResult, ITransformedGenreResult, ISearchQueryParams } from '@types';
import { environment } from '@constants';
import isEqual from 'lodash.isequal';

export const movieApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3',
    }),
    endpoints: (builder) => ({
        getUpcomingMovies: builder.query<ITransformedPaginatedResult, number>({
            query: (page = 1) => `movie/upcoming?page=${page}&api_key=${environment.API_KEY}`,
            transformResponse: ({ page, total_pages, results }: IPaginatedResult) => {
                return {
                    page,
                    results,
                    has_more_pages: page < total_pages,
                };
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (newItems.page > currentCache.page) {
                    return {
                        ...currentCache,
                        ...newItems,
                        results: [...currentCache.results, ...newItems.results]
                    };
                } else {
                    return currentCache;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
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
                        };
                    }, {})
                };
            },
        }),
        searchMovie: builder.query<ITransformedPaginatedResult, ISearchQueryParams>({
            query: ({ query = '', page = 1 }) => {
                const encodedQuery = encodeURIComponent(query);
                return `/search/movie/?query=${encodedQuery}&page=${page}&api_key=${environment.API_KEY}`;
            },
            transformResponse: ({ page, total_pages, results }: IPaginatedResult) => {
                return {
                    page,
                    results,
                    has_more_pages: page < total_pages,
                };
            },
            serializeQueryArgs: ({ queryArgs }) => {
                // serialize data based on query input
                return queryArgs.query;
            },
            merge: (currentCache, newItems) => {
                if (newItems.page > currentCache.page) {
                    return {
                        ...currentCache,
                        ...newItems,
                        results: [...currentCache.results, ...newItems.results]
                    };
                } else {
                    return currentCache;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return isEqual(currentArg?.query, previousArg?.query);
            },
        }),
    }),

});

export const {
    useGetUpcomingMoviesQuery,
    useGetMovieByIdQuery,
    useGetGenresQuery,
    useSearchMovieQuery,
} = movieApi;
