import { Link } from 'react-router-dom';
import logo from './logo.png';
import { priceMoreThan10 } from '../App';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Pages, setPage } from '../../redux/slices/sneakers';
import { openCart } from '../../redux/slices/cart';

const Header = () => {
  // const {  currentPage, setCurrentPage } = useContext(AppContext);
  const dispatch: AppDispatch = useDispatch();

  const { finalPrice } = useTypedSelector((state) => state.cart);
  const { page } = useTypedSelector((state) => state.sneakers);

  const setCurrentPage = (page: Pages) => {
    dispatch(setPage(page));
  };

  const onOpenCart = () => {
    dispatch(openCart());
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo" onClick={() => setCurrentPage('main')}>
          <img src={logo} alt="logo" />
          <div className="header__logo-text">
            <h2>SNEAKERS4YOU</h2>
            <p>Кроссовки на любой вкус!</p>
          </div>
        </div>
      </Link>
      <nav className="header__nav">
        <Link to="/">
          <li
            className={page === 'main' ? 'header__nav-item selected' : 'header__nav-item'}
            onClick={() => setCurrentPage('main')}>
            Главная
          </li>
        </Link>

        <Link to="/orders">
          <li
            className={page === 'orders' ? 'header__nav-item selected' : 'header__nav-item'}
            onClick={() => setCurrentPage('orders')}>
            Мои покупки
          </li>
        </Link>

        <Link to="/favorites">
          <li
            className={
              page === 'favorites' ? 'header__nav-item selected-favorites' : 'header__nav-item'
            }
            onClick={() => setCurrentPage('favorites')}>
            Избранное
          </li>
        </Link>
      </nav>
      <div className="header__cart" onClick={onOpenCart}>
        <b>{priceMoreThan10(finalPrice)} руб.</b>
        <img src="./img/cart.svg" alt="cart" />
      </div>
    </header>
  );
};

export default Header;
