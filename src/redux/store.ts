import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart';
import ordersReducer from './slices/orders';
import favsReducer from './slices/favorites';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    favorites: favsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
