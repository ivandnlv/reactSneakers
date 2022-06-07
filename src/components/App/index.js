import { useEffect, useState } from "react";
import Main from "../../pages/Main";
import getSneakers from "../../service/getSneakers";
import Header from "../Header";
import AppContext from '../Context';
import Cart from "../Cart";
import { Routes, Route } from "react-router-dom";
import Favorites from "../../pages/Favorites";
import Orders from "../../pages/Orders";
import axios from "axios";

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [cartSneakers, setCartSneakers] = useState([]);
  const [favoriteSneakers, setFavoriteSneakers] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  const [sneakersFilters, setSneakersFilters] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const [orders, setOrders] = useState([]);

  // Пагинация

  const [sneakersShowCount, setSneakersShowCount] = useState(9);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [sneakersLength, setSneakersLength] = useState(0);
  const lastSneaker = sneakersShowCount * currentPageNumber;
  const firstSneaker = lastSneaker - sneakersShowCount;
  

  useEffect(() => {
      setLoading(true);
      const localCartSneakers = JSON.parse(localStorage.getItem('cartSneakers'));
      const localFavSneakers = JSON.parse(localStorage.getItem('favoriteSneakers'));
      const localOrders = JSON.parse(localStorage.getItem('orders'));
      localCartSneakers && setCartSneakers([...localCartSneakers]);
      localFavSneakers && setFavoriteSneakers([...localFavSneakers]);
      localOrders && setOrders([...localOrders]);
      const getSneakersLength = async () => {
        await axios.get('https://628f5df8dc478523653f3f73.mockapi.io/items')
          .then(res => setSneakersLength(res.data.length));
      }
      getSneakersLength();
      getSneakers(firstSneaker, lastSneaker)
        .then(res => setSneakers(res))
        .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartSneakers', JSON.stringify(cartSneakers));
    let sum = 0;
    cartSneakers.forEach(item => item.salePrice ? sum += item.salePrice : sum += item.price);
    setSum(sum);
  }, [cartSneakers]);

  useEffect(() => {
    localStorage.setItem('favoriteSneakers', JSON.stringify(favoriteSneakers));
  }, [favoriteSneakers]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders])

  useEffect(() => {
    setLoading(true);
    getSneakers(firstSneaker, lastSneaker)
      .then(res => setSneakers(res))
      .finally(() => setLoading(false));
  }, [currentPageNumber]);

  const openCart = () => {
    setIsCartOpened(true);
  }

  const closeCart = () => {
    setIsCartOpened(false);
  }

  const sneakerToCart = (obj) => {
    if (cartSneakers.find(item => item.img === obj.img)) {
      setCartSneakers(prev => prev.filter(item => item.img !== obj.img));
    } else {
      setCartSneakers(prev => [...prev, obj]);
    }
  }

  const sneakerToFavorite = (obj) => {
    if (favoriteSneakers.find(item => item.img === obj.img)) {
      setFavoriteSneakers(prev => prev.filter(item => item.img !== obj.img));
    } else {
      setFavoriteSneakers(prev => [...prev, obj]);
    }
  }

  const sneakersToOrders = (arr) => {
    setOrders(prev => [...prev, ...arr]);
  }

  const deleteFromCart = (obj) => {
    setCartSneakers(prev => prev.filter(item => item.img !== obj.img));
  }

  const isAlreadyInCart = (img) => {
    return cartSneakers.find(item => item.img === img);
  }

  const isAlreadyInFav = (img) => {
    return favoriteSneakers.find(item => item.img === img);
  }

  const priceMoreThan10 = (price) => {
    if (price > 10000) {
        let str = `${price}`;
        return `${str.slice(0,2)} ${str.slice(2)}`;
    } else return price;
  }

  const onSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="wrapper">
      <AppContext.Provider value={{
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
          currentPageNumber
        }}>
        <Header openCart={openCart} sum={sum}/>
        {isCartOpened ? <Cart closeCart={closeCart} sum={sum}/> : null}
        <hr />
        <div className="content">
          <Routes>
            <Route path="/" exact element={
              <Main 
                onSearchInputChange={onSearchInputChange}
                sneakers={sneakers} 
                loading={loading}
              />
            }>
            </Route>
            <Route path="/orders" exact element={
              <Orders />
            }>
            </Route>
            <Route path="/favorites" exact element={
              <Favorites />
            }>
            </Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
