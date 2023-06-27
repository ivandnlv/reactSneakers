import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { Brands } from '../../models/types/brands';

type Sort = 'asc' | 'desc' | 'default';

interface IFiltersState {
  sneakers: ISneaker[] | null;
  brands: Brands[] | null;
  sort: Sort;
  sale: boolean;
}

const defaultState: IFiltersState = {
  sneakers: null,
  brands: null,
  sort: 'default',
  sale: false,
};

const initialState: IFiltersState = Object.assign(defaultState);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addBrand(state, action: PayloadAction<Brands>) {
      if (state.brands) {
        if (state.brands.includes(action.payload)) {
          if (state.brands.length) {
            state.brands = state.brands.filter((brand) => brand !== action.payload);
          } else {
            state.brands = null;
          }
        } else {
          state.brands.push(action.payload);
        }
      } else {
        state.brands = [action.payload];
      }
    },
    changeSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    changeSale(state, action: PayloadAction<boolean>) {
      state.sale = action.payload;
    },
    resetFilters(state, action: PayloadAction<IFiltersState>) {
      state = action.payload;
    },
  },
});

export const { addBrand, changeSale, changeSort } = filtersSlice.actions;

export default filtersSlice.reducer;
