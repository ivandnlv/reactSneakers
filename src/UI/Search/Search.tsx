import React from 'react';
import searchIcon from './search-icon.svg';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { changeSearch } from '../../redux/slices/filters';

const Search = () => {
  const dispatch: AppDispatch = useDispatch();

  const onSearchInputChange = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      dispatch(changeSearch(e.target.value));
    }
  };

  return (
    <div className="search">
      <img src={searchIcon} alt="search" />
      <input placeholder="Поиск..." onChange={(e) => onSearchInputChange(e)} />
    </div>
  );
};

export default Search;
