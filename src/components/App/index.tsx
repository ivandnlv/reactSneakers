import { useEffect, useState } from 'react';
import Main from '../../pages/Main';
import getSneakers from '../../service/GetSneakers';
import Header from '../Header';
import AppContext from '../Context';
import Cart from '../Cart';
import { Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/Favorites';
import Orders from '../../pages/Orders';
import axios from 'axios';
import { ISneaker } from '../../models/interfaces/sneaker';
import { ISneakersFilters } from '../../models/interfaces/sneakersFilters';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';

function App() {
  const dispatch: AppDispatch = useDispatch();

  // const {  } = useTypedSelector(state => state.sneakers)

  const [sneakers, setSneakers] = useState<ISneaker[] | null>(null);
  const [cartSneakers, setCartSneakers] = useState<ISneaker[] | null>(null);
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

  // Получение данных с сервера

  useEffect(() => {
    setLoading(true);
    const localCartSneakers = localStorage.getItem('cartSneakers');
    const localFavSneakers = localStorage.getItem('favoriteSneakers');
    const localOrders = localStorage.getItem('orders');

    if (localCartSneakers) setCartSneakers(JSON.parse(localCartSneakers));
    if (localFavSneakers) setFavoriteSneakers(JSON.parse(localFavSneakers));
    if (localOrders) setOrders(JSON.parse(localOrders));

    const getSneakersLength = async () => {
      await axios
        .get('https://628f5df8dc478523653f3f73.mockapi.io/items')
        .then((res) => setSneakersLength(res.data.length));
    };
    getSneakersLength();
    getSneakers(firstSneaker, lastSneaker)
      .then((res) => setSneakers(res))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, [firstSneaker, lastSneaker]);

  // Обновление данных в localStorage и измнение суммы, отображающейся в корзине при изменениях с корзиной
  useEffect(() => {
    localStorage.setItem('cartSneakers', JSON.stringify(cartSneakers));
    let sum = 0;
    cartSneakers?.forEach((item) => {
      if (item.sale) {
        console.log('sale!');
      }
    });
    setSum(sum);
  }, [cartSneakers]);

  // Обновление localStorage favorites и orders

  useEffect(() => {
    localStorage.setItem('favoriteSneakers', JSON.stringify(favoriteSneakers));
  }, [favoriteSneakers]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Изменение пагинации

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
      setCartSneakers((prev) =>
        prev !== null ? prev.filter((item) => item.img !== obj.img) : prev,
      );
    } else {
      setCartSneakers((prev) => (prev !== null ? [...prev, obj] : null));
    }
  };

  const sneakerToFavorite = (obj: ISneaker) => {
    if (favoriteSneakers?.find((item) => item.img === obj.img)) {
      setFavoriteSneakers((prev) =>
        prev !== null ? prev.filter((item) => item.img !== obj.img) : prev,
      );
    } else {
      setFavoriteSneakers((prev) => (prev !== null ? [...prev, obj] : null));
    }
  };

  const sneakersToOrders = (arr: ISneaker[]) => {
    setOrders((prev) => (prev !== null ? [...prev, ...arr] : null));
  };

  const deleteFromCart = (obj: ISneaker) => {
    setCartSneakers((prev) => {
      if (prev) {
        return prev.filter((item) => item.img !== obj.img);
      } else return null;
    });
  };

  const isAlreadyInCart = (img: string) => {
    let yes = 0;
    cartSneakers?.forEach((sneaker) => {
      if (sneaker.img === img) yes += 1;
    });
    if (yes === 0) return false;
    else return true;
  };

  const isAlreadyInFav = (img: string) => {
    let yes = 0;
    favoriteSneakers?.forEach((sneaker) => {
      if (sneaker.img === img) yes += 1;
    });
    if (yes === 0) return false;
    else return true;
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
        {/* <Header openCart={openCart} sum={sum} /> */}
        {/* {isCartOpened ? <Cart closeCart={closeCart} sum={sum} /> : null} */}
        <hr />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  onSearchInputChange={onSearchInputChange}
                  sneakers={sneakers}
                  loading={loading}
                />
              }></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
