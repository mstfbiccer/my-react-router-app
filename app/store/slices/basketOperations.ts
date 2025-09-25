import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface BasketItem {
  productId: string;
  quantity: number;
}

// TR: initialState, slice'ın başlangıç durumunu tanımlar.
const initialState = {
  items: []
}

// TR: createSlice fonksiyonu ile slice oluşturuyoruz.
export const basketOperationsSlice = createSlice({
  name: 'basketOperations',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<BasketItem>) => {
      // filter: Filter fonksiyonu verilen şarta uyan elemanları döner.
      state.items = state.items.filter((item) => item === action.payload)
    },
    clearBasket: (state) => {
      state.items = []
    },
  },
})
// TR: Action creator'ları export ediyoruz ki component'lerimizde kullanabilelim.
export const { addItem, removeItem, clearBasket } = basketOperationsSlice.actions

// TR: Reducer'ı export ediyoruz ki store'da kullanabilelim.
export default basketOperationsSlice.reducer;
