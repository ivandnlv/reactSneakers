import React, { useState, useEffect } from 'react';
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
import { IOrderSneaker } from '../../redux/slices/orders';

interface ISneakersItemProps {
  sneaker: ISneaker | IOrderSneaker;
  isOrders?: boolean;
  type?: 'default' | 'orders';
}

function isOrderSneaker(sneaker: ISneaker | IOrderSneaker): sneaker is IOrderSneaker {
  return (sneaker as IOrderSneaker).count !== undefined;
}

const SneakersItem = ({ sneaker, isOrders = false, type = 'default' }: ISneakersItemProps) => {
  useEffect(() => {
    setIsInCart(isAlreadyInCart());
    setIsInFavs(isAlreadyInFav());
  }, []);

  const dispatch: AppDispatch = useDispatch();

  const cartSneakers = useTypedSelector((state) => state.cart.cartSneakers);
  const { favSneakers } = useTypedSelector((state) => state.favorites);

  const [isInCart, setIsInCart] = useState(false);
  const [isInFavs, setIsInFavs] = useState(false);

  const salePrice = sneaker.sale ? Math.floor(sneaker.price * sneaker.sale) : null;

  useEffect(() => {
    if (cartSneakers?.some((cartSneaker) => cartSneaker.id === sneaker.id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }

    if (favSneakers?.some((favSneaker) => favSneaker.id === sneaker.id)) {
      setIsInFavs(true);
    } else {
      setIsInFavs(false);
    }
  }, [cartSneakers, favSneakers]);

  const onClickPlus = () => {
    setIsInCart(!isInCart);
    dispatch(addToCart(sneaker));
  };

  const onClickHeart = () => {
    setIsInFavs(!isInFavs);
    dispatch(addToFavs(sneaker));
  };

  const isAlreadyInCart = (): boolean => {
    if (cartSneakers) {
      return cartSneakers.some((cartSneaker) => cartSneaker.id === sneaker.id);
    } else return false;
  };

  const isAlreadyInFav = (): boolean => {
    if (favSneakers) {
      return favSneakers.some((favSneaker) => favSneaker.id === sneaker.id);
    }
    return false;
  };

  if (type === 'orders' && isOrderSneaker(sneaker)) {
    return (
      <div className="sneakers__list-item true">
        <img
          src={sneaker.imgUrl}
          alt={'sneaker' + sneaker.id}
          className="sneakers__list-item-img"
        />
        <p>{sneaker.title}</p>
        <p style={{ marginTop: 10 }}>Всего куплено пар: {sneaker.count}</p>
        <span>Куплено по цене: </span>
        <b>
          {salePrice ? priceMoreThan10(salePrice) : priceMoreThan10(sneaker.price)}
          руб.
        </b>
      </div>
    );
  }

  return (
    <div className="sneakers__list-item true">
      {!isOrders && (
        <button className="sneakers__list-item-favorite" onClick={onClickHeart}>
          <img
            src={isInFavs ? favoritedIcon : unfavoritedIcon}
            alt={isInFavs ? 'favorited' : 'unfavorited'}
          />
        </button>
      )}
      <img src={sneaker.imgUrl} alt={'sneaker' + sneaker.id} className="sneakers__list-item-img" />
      <p>{sneaker.title}</p>
      <span>
        Цена: {sneaker.sale ? <b className="sneakers__list-item-prev"> {sneaker.price}</b> : null}
      </span>
      <b className={sneaker.sale ? 'sneakers__list-item-sale' : undefined}>
        {salePrice ? priceMoreThan10(salePrice) : priceMoreThan10(sneaker.price)}
        руб.
      </b>
      {!isOrders && (
        <button className="sneakers__list-item-tocart" onClick={onClickPlus}>
          <img
            src={isInCart ? inCartIcon : toCartIcon}
            alt={isInFavs ? 'alreadyincart' : 'addtocart'}
          />
        </button>
      )}
    </div>
  );
};

export default SneakersItem;
