import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ISneakersState {
  sneakers: ISneaker[] | null;
}

const initialState: ISneakersState = {
  sneakers: null,
};

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setSneakers(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
  },
});

export const { setSneakers } = sneakersSlice.actions;

export default sneakersSlice.reducer;
