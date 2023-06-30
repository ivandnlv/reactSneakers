import React, { useState } from 'react';
import toCartIcon from './add-to-cart.svg';
import inCartIcon from './added-to-cart.svg';
import unfavoritedIcon from './unfavorited.svg';
import favoritedIcon from './favorited.svg';
import { ISneaker } from '../../models/interfaces/sneaker';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cart';
import { addToFavs } from '../../redux/slices/favorites';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { priceMoreThan10 } from '../App';

type SneakersItemProps = {
  sneaker: ISneaker;
};

const SneakersItem: React.FC<SneakersItemProps> = ({ sneaker }) => {
  const dispatch: AppDispatch = useDispatch();

  const { cartSneakers } = useTypedSelector((state) => state.cart);
  const { favSneakers } = useTypedSelector((state) => state.favorites);

  const salePrice = Math.floor(sneaker.price * sneaker.sale);

  const onClickPlus = () => {
    dispatch(addToCart(sneaker));
  };

  const onClickHeart = () => {
    dispatch(addToFavs(sneaker));
  };

  const isAlreadyInCart = () => {
    return cartSneakers.includes(sneaker);
  };

  const isAlreadyInFav = () => {
    return favSneakers.includes(sneaker);
  };

  return (
    <div className="sneakers__list-item true">
      <button className="sneakers__list-item-favorite" onClick={onClickHeart}>
        <img
          src={isAlreadyInFav ? favoritedIcon : unfavoritedIcon}
          alt={isAlreadyInFav ? 'favorited' : 'unfavorited'}
        />
      </button>
      <img src={sneaker.imgUrl} alt={'sneaker' + sneaker.id} className="sneakers__list-item-img" />
      <p>{sneaker.title}</p>
      <span>
        Цена: {sneaker.sale ? <b className="sneakers__list-item-prev"> {sneaker.price}</b> : null}
      </span>
      <b className={sneaker.sale ? 'sneakers__list-item-sale' : undefined}>
        {sneaker.sale ? priceMoreThan10(salePrice) : priceMoreThan10(sneaker.price)}
        руб.
      </b>
      <button className="sneakers__list-item-tocart" onClick={onClickPlus}>
        <img
          src={!isAlreadyInCart ? inCartIcon : toCartIcon}
          alt={isAlreadyInCart ? 'alreadyincart' : 'addtocart'}
        />
      </button>
    </div>
  );
};

export default SneakersItem;
