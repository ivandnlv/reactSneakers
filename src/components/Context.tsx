import { createContext } from 'react';
import { IContext } from '../models/interfaces/context';

const defaultState: IContext = {
  sneakers: null,
  cartSneakers: null,
  currentPage: 'main',
  currentPageNumber: 1,
  favoriteSneakers: null,
  orders: null,
  searchValue: '',
  sneakersFilters: null,
  sneakersLength: 0,
  sneakersShowCount: 0,
};

const AppContext = createContext<IContext>(defaultState);

export default AppContext;
