import React from 'react';
import logo from './logo.png';

const Header = () => {
    return (
        <header className='header'>
            <div className="header__logo">
                <img src={logo} alt="logo" />
                <div className="header__logo-text">
                    <h2>SNEAKERS4YOU</h2>
                    <p>Кроссовки на любой вкус!</p>
                </div>
            </div>
            <div className="header__hamburger">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </header>
    );
};

export default Header;