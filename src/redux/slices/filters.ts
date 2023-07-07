import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Brands } from '../../models/types/brands';

export type SortBy = 'asc' | 'desc';
export type SortField = 'id' | 'price';

export interface IFiltersState {
  brands: Brands[];
  sortBy: SortBy;
  sortField: SortField;
  sale: boolean;
  search: string;
}

interface IChangeSortPayload {
  sortBy: SortBy;
  sortField: SortField;
}

export const filtersDefaultState: IFiltersState = {
  brands: [],
  sortBy: 'asc',
  sortField: 'id',
  sale: false,
  search: '',
};

const initialState: IFiltersState = Object.assign(filtersDefaultState);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeBrands(state, action: PayloadAction<Brands[]>) {
      if (action.payload.length) {
        state.brands = action.payload;
      } else {
        state.brands = [];
      }
    },
    addBrand(state, action: PayloadAction<Brands>) {
      if (state.brands) {
        if (state.brands.includes(action.payload)) {
          if (state.brands.length) {
            state.brands = state.brands.filter((brand) => brand !== action.payload);
          } else {
            state.brands = [];
          }
        } else {
          state.brands.push(action.payload);
        }
      } else {
        state.brands = [action.payload];
      }
    },
    changeSort(state, action: PayloadAction<IChangeSortPayload>) {
      const { sortBy, sortField } = action.payload;
      state.sortBy = sortBy;
      state.sortField = sortField;
    },
    changeSale(state, action: PayloadAction<boolean>) {
      state.sale = action.payload;
    },
    changeSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetFilters(state) {
      state.brands = filtersDefaultState.brands;
      state.sale = filtersDefaultState.sale;
      state.search = filtersDefaultState.search;
      state.sortBy = filtersDefaultState.sortBy;
      state.sortField = filtersDefaultState.sortField;
    },
  },
});

export const { addBrand, changeSale, changeSort, changeSearch, resetFilters, changeBrands } =
  filtersSlice.actions;

export default filtersSlice.reducer;
