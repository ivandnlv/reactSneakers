import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Context';
import logo from './logo.png';

const Header = ({ openCart, sum }) => {
  const { priceMoreThan10, currentPage, setCurrentPage } = useContext(AppContext);

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
            className={currentPage === 'main' ? 'header__nav-item selected' : 'header__nav-item'}
            onClick={() => setCurrentPage('main')}>
            Главная
          </li>
        </Link>

        <Link to="/orders">
          <li
            className={currentPage === 'orders' ? 'header__nav-item selected' : 'header__nav-item'}
            onClick={() => setCurrentPage('orders')}>
            Мои покупки
          </li>
        </Link>

        <Link to="/favorites">
          <li
            className={
              currentPage === 'favorites'
                ? 'header__nav-item selected-favorites'
                : 'header__nav-item'
            }
            onClick={() => setCurrentPage('favorites')}>
            Избранное
          </li>
        </Link>
      </nav>
      <div className="header__cart" onClick={openCart}>
        <b>{priceMoreThan10(sum)} руб.</b>
        <img src="./img/cart.svg" alt="cart" />
      </div>
    </header>
  );
};

export default Header;
