import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSneakersTotalCount } from '../../service/GetSneakers';

export const fetchSneakersCount = createAsyncThunk('sneakers/fetchSneakersCount', async () => {
  try {
    const sneakersCount: number = await getSneakersTotalCount();
    return sneakersCount;
  } catch (error) {
    console.log('Произошла ошибка: ', error);
    return null;
  }
});

interface IPaginationState {
  totalSneakersCount: number | null;
  sneakersPerPage: number;
  currentPage: number;
  pages: number[] | null;
  lastSneakerId: number;
}

const initialState: IPaginationState = {
  currentPage: 1,
  sneakersPerPage: 12,
  totalSneakersCount: null,
  pages: null,
  lastSneakerId: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalSneakersCount(state, action: PayloadAction<number>) {
      state.totalSneakersCount = action.payload;
    },
    setLastSneakerId(state, action: PayloadAction<number>) {
      state.lastSneakerId = action.payload;
      console.log('last id: ', state.lastSneakerId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakersCount.fulfilled, (state, action: PayloadAction<number | null>) => {
      state.totalSneakersCount = action.payload;
      if (state.totalSneakersCount) {
        for (let i = 1; i <= Math.ceil(state.totalSneakersCount / state.sneakersPerPage); i++) {
          if (!state.pages) {
            state.pages = [i];
          } else {
            state.pages.push(i);
          }
        }
      }
      state.pages = [...new Set(state.pages)];
    });
  },
});

export const { setCurrentPage, setTotalSneakersCount, setLastSneakerId } = paginationSlice.actions;

export default paginationSlice.reducer;
