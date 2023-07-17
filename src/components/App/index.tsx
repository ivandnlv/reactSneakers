import Main from '../../pages/Main';
import Header from '../Header';
import Cart from '../Cart';
import { Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/Favorites';
import Orders from '../../pages/Orders';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { LocalStorageItems } from '../../models/types/localStorage';
import { setOrders } from '../../redux/slices/orders';
import { setCart } from '../../redux/slices/cart';
import { setFavs } from '../../redux/slices/favorites';

export const priceMoreThan10 = (price: number): number | string => {
  if (price > 10000) {
    let str = `${price}`;
    return `${str.slice(0, 2)} ${str.slice(2)}`;
  } else return price;
};

function App() {
  const dispatch: AppDispatch = useDispatch();

  const orders = useTypedSelector((state) => state.orders.ordersSneakers);
  const cart = useTypedSelector((state) => state.cart.cartSneakers);
  const favs = useTypedSelector((state) => state.favorites.favSneakers);

  useEffect(() => {
    const localOrders = localStorage.getItem('orders' as LocalStorageItems);
    const localCart = localStorage.getItem('cart' as LocalStorageItems);
    const localFavs = localStorage.getItem('favorites' as LocalStorageItems);

    if (localOrders) {
      dispatch(setOrders(JSON.parse(localOrders)));
    }

    if (localCart) {
      dispatch(setCart(JSON.parse(localCart)));
    }

    if (localFavs) {
      dispatch(setFavs(JSON.parse(localFavs)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('orders' as LocalStorageItems, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cart' as LocalStorageItems, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites' as LocalStorageItems, JSON.stringify(favs));
  }, [favs]);

  const { open } = useTypedSelector((state) => state.cart);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <div className="wrapper">
      <Header />
      {open ? <Cart /> : null}
      <hr />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
