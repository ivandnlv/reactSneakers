import React from 'react';
import { Link } from 'react-router-dom';
import sadSmile from './smile.png';
import Btn from '../../UI/Btn';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Pages, setPage } from '../../redux/slices/sneakers';

const EmptyFavorites = () => {
  const dispatch: AppDispatch = useDispatch();

  const setCurrentPage = (page: Pages) => {
    dispatch(setPage(page));
  };

  return (
    <div className="emptyfavorites">
      <img src={sadSmile} alt="sad-smile" />
      <h1>Тут пусто {':('}</h1>
      <p>Вы ничего не добавляли в закладки</p>
      <Link to="/">
        <Btn btnType={'back'} onClick={() => setCurrentPage('main')}>
          Вернуться назад
        </Btn>
      </Link>
    </div>
  );
};

export default EmptyFavorites;
