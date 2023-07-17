import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';

interface IFavoritesState {
  favSneakers: ISneaker[] | null;
}

const initialState: IFavoritesState = {
  favSneakers: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavs(state, action: PayloadAction<ISneaker>) {
      // if (state.favSneakers && !state.favSneakers.includes(action.payload)) {
      //   state.favSneakers.push(action.payload);
      // } else if (state.favSneakers && state.favSneakers.includes(action.payload)) {
      //   state.favSneakers = state.favSneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      // } else if (!state.favSneakers) {
      //   state.favSneakers = [action.payload];
      // }

      const sneaker = action.payload;

      if (state.favSneakers) {
        if (state.favSneakers.some((favSneaker) => favSneaker.id === sneaker.id)) {
          state.favSneakers = state.favSneakers.filter(
            (favSneaker) => favSneaker.id !== sneaker.id,
          );
        } else {
          state.favSneakers.push(sneaker);
        }
      } else {
        state.favSneakers = [sneaker];
      }
    },
    removeFromFavs(state, action: PayloadAction<ISneaker>) {
      if (state.favSneakers) {
        state.favSneakers = state.favSneakers.filter((sneaker) => sneaker.id !== action.payload.id);
      }
    },
    setFavs(state, action: PayloadAction<ISneaker[]>) {
      state.favSneakers = action.payload;
    },
  },
});

export const { addToFavs, removeFromFavs, setFavs } = favoritesSlice.actions;

export default favoritesSlice.reducer;
