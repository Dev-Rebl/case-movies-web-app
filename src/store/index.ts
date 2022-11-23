import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './reducers/counter';
import { movieApi } from './services/moviedb';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        [movieApi.reducerPath]: movieApi.reducer
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch