import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

interface ICartState {
  cartSneakers: ISneaker[] | null;
  sale: number;
  finalPrice: number;
  open: boolean;
}

const defaultValues: ICartState = {
  cartSneakers: null,
  finalPrice: 0,
  sale: 0,
  open: false,
};

const initialState: ICartState = Object.assign(defaultValues);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ISneaker>) {
      if (state.cartSneakers && !state.cartSneakers?.includes(action.payload)) {
        state.cartSneakers?.push(action.payload);
        if (action.payload.sale) {
          state.finalPrice += Math.floor(action.payload.sale * action.payload.price);
        } else {
          state.finalPrice += action.payload.price;
        }
      } else if (!state.cartSneakers) {
        state.cartSneakers = [action.payload];
        if (action.payload.sale) {
          state.finalPrice += Math.floor(action.payload.sale * action.payload.price);
        } else {
          state.finalPrice += action.payload.price;
        }
      } else if (state.cartSneakers.includes(action.payload)) {
        state.cartSneakers = state.cartSneakers.filter(
          (sneaker) => sneaker.id !== action.payload.id,
        );
      }
    },
    removeFromCart(state, action: PayloadAction<ISneaker>) {
      if (state.cartSneakers && state.cartSneakers.length > 1) {
        state.cartSneakers = state.cartSneakers?.filter(
          (sneaker) => sneaker.id !== action.payload.id,
        );
      } else if (state.cartSneakers && state.cartSneakers.length <= 1) {
        state.cartSneakers = null;
      }

      if (action.payload.sale) {
        state.finalPrice -= Math.floor(action.payload.price * action.payload.sale);
      } else {
        state.finalPrice -= action.payload.price;
      }
    },
    setCart(state, action: PayloadAction<ISneaker[]>) {
      state.cartSneakers = action.payload;
    },
    closeCart(state) {
      state.open = false;
    },
    openCart(state) {
      state.open = true;
    },
    resetCart(state) {
      state = defaultValues;
    },
  },
});

export const { addToCart, removeFromCart, setCart, closeCart, openCart, resetCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default cartSlice.reducer;
