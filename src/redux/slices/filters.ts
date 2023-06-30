import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISneaker } from '../../models/interfaces/sneaker';
import { Brands } from '../../models/types/brands';

export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default',
}

interface IFiltersState {
  filteredSneakers: ISneaker[] | null;
  brands: Brands[] | null;
  sort: SortEnum;
  sale: boolean;
  search: string;
}

export const defaultState: IFiltersState = {
  filteredSneakers: null,
  brands: null,
  sort: SortEnum.DEFAULT,
  sale: false,
  search: '',
};

const initialState: IFiltersState = Object.assign(defaultState);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilteredSneakers(state, action: PayloadAction<ISneaker[]>) {
      state.filteredSneakers = action.payload;
    },
    changeBrands(state, action: PayloadAction<Brands[]>) {
      if (action.payload.length) {
        state.brands = action.payload;
      } else {
        state.brands = null;
      }
    },
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
    changeSort(state, action: PayloadAction<SortEnum>) {
      state.sort = action.payload;
    },
    changeSale(state, action: PayloadAction<boolean>) {
      state.sale = action.payload;
    },
    changeSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetFilters(state) {
      state = defaultState;
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
