import { useEffect, useState } from 'react';
import Main from '../../pages/Main';
import getSneakers from '../../service/GetSneakers';
import Header from '../Header';
import AppContext from '../Context.tsx';
import Cart from '../Cart';
import { Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/Favorites';
import Orders from '../../pages/Orders';
import axios from 'axios';
import React from 'react';
import { ICartSneaker, ISneaker } from '../../models/interfaces/sneaker';
import { ISneakersFilters } from '../../models/interfaces/sneakersFilters';

function App() {
  const [sneakers, setSneakers] = useState<ISneaker[] | null>(null);
  const [cartSneakers, setCartSneakers] = useState<ICartSneaker[] | null>(null);
  const [favoriteSneakers, setFavoriteSneakers] = useState<ISneaker[] | null>(null);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  const [sneakersFilters, setSneakersFilters] = useState<ISneakersFilters | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState<'main' | 'orders' | 'favorites'>('main');
  const [orders, setOrders] = useState<ISneaker[] | null>(null);

  // Пагинация

  const sneakersShowCount = 9;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [sneakersLength, setSneakersLength] = useState(0);
  const lastSneaker = sneakersShowCount * currentPageNumber;
  const firstSneaker = lastSneaker - sneakersShowCount;

  useEffect(() => {
    setLoading(true);
    const localCartSneakers = localStorage.getItem('cartSneakers');
    const localFavSneakers = localStorage.getItem('favoriteSneakers');
    const localOrders = localStorage.getItem('orders');

    if (localCartSneakers) setCartSneakers([...JSON.parse(localCartSneakers)]);
    if (localFavSneakers) setFavoriteSneakers([...JSON.parse(localFavSneakers)]);
    if (localOrders) setOrders([...JSON.parse(localOrders)]);

    const getSneakersLength = async () => {
      await axios
        .get('https://628f5df8dc478523653f3f73.mockapi.io/items')
        .then((res) => setSneakersLength(res.data.length));
    };
    getSneakersLength();
    getSneakers(firstSneaker, lastSneaker)
      .then((res) => setSneakers(res))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartSneakers', JSON.stringify(cartSneakers));
    let sum = 0;
    cartSneakers?.forEach((item) =>
      item.salePrice ? (sum += item.salePrice) : (sum += item.price),
    );
    setSum(sum);
  }, [cartSneakers]);

  useEffect(() => {
    localStorage.setItem('favoriteSneakers', JSON.stringify(favoriteSneakers));
  }, [favoriteSneakers]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    setLoading(true);
    getSneakers(firstSneaker, lastSneaker)
      .then((res) => setSneakers(res))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, [currentPageNumber, firstSneaker, lastSneaker]);

  const openCart = () => {
    setIsCartOpened(true);
  };

  const closeCart = () => {
    setIsCartOpened(false);
  };

  const sneakerToCart = (obj: ISneaker) => {
    if (cartSneakers?.find((item) => item.img === obj.img)) {
      setCartSneakers((prev) => prev.filter((item) => item.img !== obj.img));
    } else {
      setCartSneakers((prev) => [...prev, obj]);
    }
  };

  const sneakerToFavorite = (obj: ISneaker) => {
    if (favoriteSneakers?.find((item) => item.img === obj.img)) {
      setFavoriteSneakers((prev) => prev.filter((item) => item.img !== obj.img));
    } else {
      setFavoriteSneakers((prev) => [...prev, obj]);
    }
  };

  const sneakersToOrders = (arr: ISneaker[]) => {
    setOrders((prev) => [...prev, ...arr]);
  };

  const deleteFromCart = (obj: ISneaker) => {
    setCartSneakers((prev) => {
      if (prev) {
        return prev.filter((item) => item.img !== obj.img);
      } else return null;
    });
  };

  const isAlreadyInCart = (img: string) => {
    return cartSneakers?.find((item) => item.img === img);
  };

  const isAlreadyInFav = (img: string) => {
    return favoriteSneakers?.find((item) => item.img === img);
  };

  const priceMoreThan10 = (price: number): number | string => {
    if (price > 10000) {
      let str = `${price}`;
      return `${str.slice(0, 2)} ${str.slice(2)}`;
    } else return price;
  };

  const onSearchInputChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setSearchValue(e.target.value);
    }
  };

  return (
    <div className="wrapper">
      <AppContext.Provider
        value={{
          sneakers,
          cartSneakers,
          sneakerToCart,
          deleteFromCart,
          isAlreadyInCart,
          priceMoreThan10,
          sneakersFilters,
          setSneakersFilters,
          searchValue,
          sneakerToFavorite,
          isAlreadyInFav,
          favoriteSneakers,
          currentPage,
          setCurrentPage,
          orders,
          sneakersToOrders,
          setCartSneakers,
          closeCart,
          sneakersLength,
          sneakersShowCount,
          setCurrentPageNumber,
          currentPageNumber,
        }}>
        <Header openCart={openCart} sum={sum} />
        {isCartOpened ? <Cart closeCart={closeCart} sum={sum} /> : null}
        <hr />
        <div className="content">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Main
                  onSearchInputChange={onSearchInputChange}
                  sneakers={sneakers}
                  loading={loading}
                />
              }></Route>
            <Route path="/orders" exact element={<Orders />}></Route>
            <Route path="/favorites" exact element={<Favorites />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
