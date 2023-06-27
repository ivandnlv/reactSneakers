import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

interface ICartState {
  sneakers: ISneaker[] | null;
  sale: number;
  finalPrice: number;
}

const initialState: ICartState = {
  sneakers: null,
  finalPrice: 0,
  sale: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ISneaker>) {
      if (!state.sneakers?.includes(action.payload)) {
        state.sneakers?.push(action.payload);
      } else if (!state.sneakers) {
        state.sneakers = [action.payload];
      } else if (state.sneakers.includes(action.payload)) {
        state.sneakers = state.sneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      }
    },
    removeFromCart(state, action: PayloadAction<ISneaker>) {
      if (state.sneakers && state.sneakers.length > 1) {
        state.sneakers = state.sneakers?.filter((sneaker) => sneaker.id !== action.payload.id);
      } else if (state.sneakers && state.sneakers.length <= 1) {
        state.sneakers = null;
      }
    },
    setCart(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default cartSlice.reducer;
