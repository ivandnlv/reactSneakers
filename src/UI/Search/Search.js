import React from 'react';
import searchIcon from './search-icon.svg';

const Search = ({onSearchInputChange}) => {
    return (
        <div className="search">
            <img src={searchIcon} alt="search" />
            <input 
                placeholder='Поиск...'
                onChange={(e) => onSearchInputChange(e)}
            />
        </div>      
    );
};

export default Search;