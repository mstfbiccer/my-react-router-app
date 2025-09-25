import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface BasketItem {
  productId: string;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
}

// TR: initialState, slice'ın başlangıç durumunu tanımlar.
const initialState: BasketState = {
  items: []
}

// TR: createSlice fonksiyonu ile slice oluşturuyoruz.
export const basketOperationsSlice = createSlice({
  name: 'basketOperations',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload.productId);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.productId !== action.payload.productId);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ productId: string }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(item => item.productId !== action.payload.productId);
        } else {
          item.quantity -= 1;
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ productId: string }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity += 1;
      }
    },
    clearBasket: (state) => {
      state.items = []
    },
  },
})

// TR: Action creator'ları export ediyoruz ki component'lerimizde kullanabilelim.
export const { addItem, removeItem, updateQuantity, decreaseQuantity, increaseQuantity, clearBasket } = basketOperationsSlice.actions

// TR: Reducer'ı export ediyoruz ki store'da kullanabilelim.
export default basketOperationsSlice.reducer;
