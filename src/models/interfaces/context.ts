import React from 'react';
import { ICartSneaker, ISneaker } from './sneaker';
import { ISneakersFilters } from './sneakersFilters';

export interface IContext {
  sneakers: ISneaker[] | null;
  cartSneakers: ISneaker[] | null;
  sneakerToCart?: (obj: ISneaker) => void;
  deleteFromCart?: (obj: ICartSneaker) => void;
  isAlreadyInCart?: (img: string) => void;
  priceMoreThan10?: (price: number) => number | string;
  sneakersFilters: ISneakersFilters | null;
  setSneakersFilters?: React.Dispatch<React.SetStateAction<ISneakersFilters | null>>;
  searchValue: string;
  sneakerToFavorite?: (obj: ISneaker) => void;
  isAlreadyInFav?: (img: string) => ISneaker | undefined;
  favoriteSneakers: ISneaker[] | null;
  currentPage: 'main' | 'orders' | 'favorites';
  setCurrentPage?: React.Dispatch<React.SetStateAction<'main' | 'orders' | 'favorites'>>;
  orders: ISneaker[] | null;
  sneakersToOrders?: (arr: ISneaker[]) => void;
  setCartSneakers?: React.Dispatch<React.SetStateAction<ICartSneaker[] | null>>;
  closeCart?: () => void;
  sneakersLength: number;
  sneakersShowCount: number;
  setCurrentPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  currentPageNumber: number;
}
