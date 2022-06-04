import React from 'react';
import logo from './logo.png';

const Header = ({openCart}) => {
    return (
        <header className='header'>
            <div className="header__logo">
                <img src={logo} alt="logo" />
                <div className="header__logo-text">
                    <h2>SNEAKERS4YOU</h2>
                    <p>Кроссовки на любой вкус!</p>
                </div>
            </div>
            <nav className='header__nav'>
                <div className='header__nav-item selected'>Главная</div>
                <div className='header__nav-item'>Мои покупки</div>
                <div className='header__nav-item'>Избранное</div>
            </nav>
            <div className="header__cart" onClick={openCart}>
                <b>0 руб.</b>
                <img src="./img/cart.svg" alt="cart" />
            </div>
        </header>
    );
};

export default Header;