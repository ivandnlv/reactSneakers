import React from 'react';
import { ISneaker } from './sneaker';
import { ISneakersFilters } from './sneakersFilters';

export interface IContext {
  sneakers: ISneaker[] | null;
  cartSneakers: ISneaker[] | null;
  sneakerToCart: (
    obj: ISneaker,
    cartSneakersArr: ISneaker[] | null,
    stateMethod: (value: React.SetStateAction<ISneaker[] | null>) => void,
  ) => void;
  deleteFromCart: (obj: ISneaker, stateMethod: (value: React.SetStateAction<ISneaker[] | null>) => void) => void;
  isAlreadyInCart: (img: string, cartSneakersArr: ISneaker[] | null) => boolean;
  priceMoreThan10: (price: number) => number | string;
  sneakersFilters: ISneakersFilters | null;
  setSneakersFilters?: React.Dispatch<React.SetStateAction<ISneakersFilters | null>>;
  searchValue: string;
  sneakerToFavorite: (obj: ISneaker, favoriteSneakers: ISneaker[] | null, stateMethod:) => void;
  isAlreadyInFav: (img: string, method: (img: string) => boolean) => boolean;
  favoriteSneakers: ISneaker[] | null;
  currentPage: 'main' | 'orders' | 'favorites';
  setCurrentPage?: React.Dispatch<React.SetStateAction<'main' | 'orders' | 'favorites'>>;
  orders: ISneaker[] | null;
  sneakersToOrders: (arr: ISneaker[]) => void;
  setCartSneakers?: React.Dispatch<React.SetStateAction<ISneaker[] | null>>;
  closeCart: () => void;
  sneakersLength: number;
  sneakersShowCount: number;
  setCurrentPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  currentPageNumber: number;
}
