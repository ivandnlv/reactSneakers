import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

type CartSneakers = ISneaker[] | null;

interface ICartState {
  cartSneakers: CartSneakers;
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
      if (state.cartSneakers) {
        if (state.cartSneakers.some((sneaker) => sneaker.id === action.payload.id)) {
          state.cartSneakers = state.cartSneakers.filter(
            (sneaker) => sneaker.id !== action.payload.id,
          );
          if (action.payload.sale) {
            state.finalPrice -= Math.floor(action.payload.price * action.payload.sale);
            return;
          } else {
            state.finalPrice -= action.payload.price;
            return;
          }
        } else {
          state.cartSneakers.push(action.payload);
        }
      } else {
        state.cartSneakers = [action.payload];
      }

      if (action.payload.sale) {
        state.finalPrice += Math.floor(action.payload.price * action.payload.sale);
      } else {
        state.finalPrice += action.payload.price;
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
    setCart(state, action: PayloadAction<ISneaker[] | null>) {
      state.cartSneakers = action.payload;
    },
    closeCart(state) {
      state.open = false;
    },
    openCart(state) {
      state.open = true;
    },
    resetCart(state) {
      state.cartSneakers = defaultValues.cartSneakers;
      state.finalPrice = defaultValues.finalPrice;
      state.sale = defaultValues.sale;
    },
  },
});

export const { addToCart, removeFromCart, setCart, closeCart, openCart, resetCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default cartSlice.reducer;
