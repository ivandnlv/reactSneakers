import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

interface IOrdersState {
  sneakers: ISneaker[] | null;
}

const initialState: IOrdersState = {
  sneakers: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToOrders(state, action: PayloadAction<ISneaker>) {
      if (state.sneakers && !state.sneakers.includes(action.payload)) {
        state.sneakers.push(action.payload);
      } else if (state.sneakers && state.sneakers.includes(action.payload)) {
        state.sneakers = state.sneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      } else if (!state.sneakers) {
        state.sneakers = [action.payload];
      }
    },
    removeFromOrders(state, action: PayloadAction<ISneaker>) {
      if (state.sneakers) {
        state.sneakers = state.sneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      }
    },
    setOrders(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
  },
});

export const { addToOrders, removeFromOrders, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
