import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

export interface IOrderSneaker extends ISneaker {
  count: number;
}

interface IOrdersState {
  ordersSneakers: IOrderSneaker[] | null;
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
          state.ordersSneakers = state.ordersSneakers.map((ordersSneaker) => {
            if (ordersSneaker.id === action.payload.id) {
              ordersSneaker.count += 1;
            }
            return ordersSneaker;
          });
        } else {
          state.ordersSneakers.push({ ...sneaker, count: 1 });
        }
      } else {
        state.ordersSneakers = [{ ...sneaker, count: 1 }];
      }
    },
    removeFromOrders(state, action: PayloadAction<IOrderSneaker>) {
      if (state.ordersSneakers) {
        state.ordersSneakers = state.ordersSneakers.filter(
          (sneaker) => sneaker.id !== action.payload.id,
        );
      }
    },
    setOrders(state, action: PayloadAction<IOrderSneaker[]>) {
      state.ordersSneakers = action.payload;
    },
  },
});

export const { addToOrders, removeFromOrders, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
