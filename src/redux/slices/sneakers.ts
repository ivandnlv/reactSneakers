import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSneakers } from '../../service/GetSneakers';
import { RootState } from '../store';

export const fetchSneakers = createAsyncThunk('sneakers/fetchSneakers', async (_, { getState }) => {
  try {
    const { pagination, filters }: RootState = getState() as RootState;
    const { currentPage, sneakersPerPage } = pagination;

    const sneakers: ISneaker[] | null = await getSneakers({
      limitNum: pagination.sneakersPerPage,
      startAfterId: currentPage === 1 ? undefined : (currentPage - 1) * sneakersPerPage,
      endBeforeId: currentPage === 1 ? undefined : currentPage * sneakersPerPage,
      filters,
    });

    return sneakers;
  } catch (error) {
    console.log('Произошла ошибка: ', error);
    return null;
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
    builder.addCase(fetchSneakers.fulfilled, (state, action: PayloadAction<ISneaker[] | null>) => {
      state.loading = false;
      state.errors = null;
      state.sneakers = action.payload;
    });
  },
});

export const { setItems, setPage } = sneakersSlice.actions;

export default sneakersSlice.reducer;
