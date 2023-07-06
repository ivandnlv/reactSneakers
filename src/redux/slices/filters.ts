import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { Brands } from '../../models/types/brands';

export type SortBy = 'asc' | 'desc';
export type SortField = 'id' | 'price';

export interface IFiltersState {
  filteredSneakers: ISneaker[] | null;
  filters: {
    brands: Brands[];
    sortBy: SortBy;
    sortField: SortField;
    sale: boolean;
    search: string;
  };
}

interface IChangeSortPayload {
  sortBy: SortBy;
  sortField: SortField;
}

export const filtersDefaultState: IFiltersState = {
  filteredSneakers: null,
  filters: {
    brands: [],
    sortBy: 'asc',
    sortField: 'id',
    sale: false,
    search: '',
  },
};

const initialState: IFiltersState = Object.assign(filtersDefaultState);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilteredSneakers(state, action: PayloadAction<ISneaker[]>) {
      state.filteredSneakers = action.payload;
    },
    changeBrands(state, action: PayloadAction<Brands[]>) {
      if (action.payload.length) {
        state.filters.brands = action.payload;
      } else {
        state.filters.brands = [];
      }
    },
    addBrand(state, action: PayloadAction<Brands>) {
      if (state.filters.brands) {
        if (state.filters.brands.includes(action.payload)) {
          if (state.filters.brands.length) {
            state.filters.brands = state.filters.brands.filter((brand) => brand !== action.payload);
          } else {
            state.filters.brands = [];
          }
        } else {
          state.filters.brands.push(action.payload);
        }
      } else {
        state.filters.brands = [action.payload];
      }
    },
    changeSort(state, action: PayloadAction<IChangeSortPayload>) {
      const { sortBy, sortField } = action.payload;
      state.filters.sortBy = sortBy;
      state.filters.sortField = sortField;
    },
    changeSale(state, action: PayloadAction<boolean>) {
      state.filters.sale = action.payload;
    },
    changeSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    resetFilters(state) {
      state = filtersDefaultState;
    },
  },
});

export const {
  addBrand,
  changeSale,
  changeSort,
  setFilteredSneakers,
  changeSearch,
  resetFilters,
  changeBrands,
} = filtersSlice.actions;

export default filtersSlice.reducer;
