import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

interface IOrdersState {
  ordersSneakers: ISneaker[] | null;
}

const initialState: IOrdersState = {
  ordersSneakers: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToOrders(state, action: PayloadAction<ISneaker>) {
      const sneaker = action.payload;

      if (state.ordersSneakers) {
        if (state.ordersSneakers.some((ordersSneaker) => ordersSneaker.id === sneaker.id)) {
          state.ordersSneakers = state.ordersSneakers.filter(
            (ordersSneaker) => ordersSneaker.id !== sneaker.id,
          );
        } else {
          state.ordersSneakers.push(sneaker);
        }
      } else {
        state.ordersSneakers = [sneaker];
      }
    },
    removeFromOrders(state, action: PayloadAction<ISneaker>) {
      if (state.ordersSneakers) {
        state.ordersSneakers = state.ordersSneakers.filter(
          (sneaker) => sneaker.id !== action.payload.id,
        );
      }
    },
    setOrders(state, action: PayloadAction<ISneaker[]>) {
      state.ordersSneakers = action.payload;
    },
  },
});

export const { addToOrders, removeFromOrders, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
