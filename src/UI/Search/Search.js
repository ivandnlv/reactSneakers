import React from 'react';
import searchIcon from './search-icon.svg';

const Search = () => {
    return (
        <div className="search">
            <img src={searchIcon} alt="search" />
            <input placeholder='Поиск...'/>
        </div>      
    );
};

export default Search;