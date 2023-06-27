import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

interface IFavoritesState {
  sneakers: ISneaker[] | null;
}

const initialState: IFavoritesState = {
  sneakers: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavs(state, action: PayloadAction<ISneaker>) {
      if (state.sneakers && !state.sneakers.includes(action.payload)) {
        state.sneakers.push(action.payload);
      } else if (state.sneakers && state.sneakers.includes(action.payload)) {
        state.sneakers = state.sneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      } else if (!state.sneakers) {
        state.sneakers = [action.payload];
      }
    },
    removeFromFavs(state, action: PayloadAction<ISneaker>) {
      if (state.sneakers) {
        state.sneakers = state.sneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      }
    },
    setFavs(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
  },
});

export const { addToFavs, removeFromFavs, setFavs } = favoritesSlice.actions;

export default favoritesSlice.reducer;
