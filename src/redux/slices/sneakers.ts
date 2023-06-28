import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { doc, getDocFromServer } from 'firebase/firestore';

const docRef = doc(db, 'lskFaQfTOf9kHr5q7Ncy', 'Sneakers');

export const fetchSneakers = createAsyncThunk('sneakers/fetchSneakers', async () => {
  const sneakers = await getDocFromServer(docRef);

  console.log(sneakers.data());

  return sneakers.data();
});

interface ISneakersState {
  sneakers: ISneaker[] | null;
  loading: boolean;
  errors: any[] | null;
}

const initialState: ISneakersState = {
  sneakers: null,
  loading: false,
  errors: null,
};

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setSneakers(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.loading = true;
      state.sneakers = null;
      state.errors = null;
    });
    builder.addCase(fetchSneakers.rejected, (state, action) => {
      state.loading = false;
      state.errors?.push(action.error);
      state.sneakers = null;
    });
    builder.addCase(fetchSneakers.fulfilled, (state) => {
      state.loading = false;
      state.errors = null;
      // state.sneakers = action.payload;
    });
  },
});

export const { setSneakers } = sneakersSlice.actions;

export default sneakersSlice.reducer;
