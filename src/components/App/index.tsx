import Main from '../../pages/Main';
import Header from '../Header';
import Cart from '../Cart';
import { Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/Favorites';
import Orders from '../../pages/Orders';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';

export const priceMoreThan10 = (price: number): number | string => {
  if (price > 10000) {
    let str = `${price}`;
    return `${str.slice(0, 2)} ${str.slice(2)}`;
  } else return price;
};

function App() {
  const dispatch: AppDispatch = useDispatch();

  const { open } = useTypedSelector((state) => state.cart);

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
