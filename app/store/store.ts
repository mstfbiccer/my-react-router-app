import { configureStore } from '@reduxjs/toolkit'
import { basketOperationsSlice } from './slices/basketOperations'

export const store = configureStore({
  reducer: {
    basketOperationsSlice: basketOperationsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch