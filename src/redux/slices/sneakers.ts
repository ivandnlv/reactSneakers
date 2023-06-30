import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore/lite';

export const fetchSneakers = createAsyncThunk('sneakers/fetchSneakers', async () => {
  try {
    const collectionId = '1';
    const documentId = 'lskFaQfTOf9kHr5q7Ncy';
    const docRef = doc(db, collectionId, documentId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const sneakersArray = data.Sneakers;
      return sneakersArray as ISneaker[];
    } else {
      console.log('Документ не найден');
      return [];
    }
  } catch (error) {
    console.log('Ошибка получения документа:', error);
    throw error;
  }
});

export type Pages = 'main' | 'favorites' | 'orders';

interface ISneakersState {
  sneakers: ISneaker[] | null;
  loading: boolean;
  errors: any[] | null;
  page: Pages;
}

const initialState: ISneakersState = {
  sneakers: null,
  loading: false,
  errors: null,
  page: 'main',
};

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ISneaker[]>) {
      state.sneakers = action.payload;
    },
    setPage(state, action: PayloadAction<Pages>) {
      state.page = action.payload;
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
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = null;
      state.sneakers = action.payload as ISneaker[];
    });
  },
});

export const { setItems, setPage } = sneakersSlice.actions;

export default sneakersSlice.reducer;
