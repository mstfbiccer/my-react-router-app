import { configureStore } from '@reduxjs/toolkit'
import { basketOperationsSlice } from './slices/basketOperations'
import { productsApi } from './api/productsApi'

export const store = configureStore({
  reducer: {
    basketOperationsSlice: basketOperationsSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch