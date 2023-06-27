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
  closeCart() {},
  deleteFromCart() {},
  isAlreadyInCart(img, method) {},
  isAlreadyInFav(img, method) {},
  priceMoreThan10(price, method) {},
  sneakersToOrders(arr) {},
  sneakerToCart(obj, method) {},
  sneakerToFavorite(obj) {},
};

const AppContext = createContext<IContext>(defaultState);

export default AppContext;
