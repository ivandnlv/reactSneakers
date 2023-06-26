import React, { useContext, useState } from 'react';
import toCartIcon from './add-to-cart.svg';
import inCartIcon from './added-to-cart.svg';
import unfavoritedIcon from './unfavorited.svg';
import favoritedIcon from './favorited.svg';
import AppContext from '../Context';
import { ISneaker } from '../../models/interfaces/sneaker';

type SneakersItemProps = ISneaker;

const SneakersItem: React.FC<SneakersItemProps> = (sneaker) => {
  const [inCart, setInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { sneakerToCart, isAlreadyInCart, priceMoreThan10, sneakerToFavorite, isAlreadyInFav } =
    useContext(AppContext);
  const salePrice = Math.floor(sneaker.price * sneaker.sale);

  const onClickPlus = () => {
    if (sneakerToCart) {
      sneakerToCart(sneaker);
    }
    setInCart(!inCart);
  };

  const onClickHeart = () => {
    if (sneakerToFavorite) {
      sneakerToFavorite(sneaker);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="sneakers__list-item true">
      <button className="sneakers__list-item-favorite" onClick={onClickHeart}>
        <img
          src={isAlreadyInFav && isAlreadyInFav(sneaker.img) ? favoritedIcon : unfavoritedIcon}
          alt={isFavorited ? 'favorited' : 'unfavorited'}
        />
      </button>
      <img src={sneaker.img} alt={'sneaker' + sneaker.id} className="sneakers__list-item-img" />
      <p>{sneaker.title}</p>
      <span>
        Цена: {sneaker.sale ? <b className="sneakers__list-item-prev"> {sneaker.price}</b> : null}
      </span>
      <b className={sneaker.sale ? 'sneakers__list-item-sale' : undefined}>
        {sneaker.sale && priceMoreThan10
          ? priceMoreThan10(salePrice)
          : priceMoreThan10 && priceMoreThan10(sneaker.price)}{' '}
        руб.
      </b>
      <button className="sneakers__list-item-tocart" onClick={onClickPlus}>
        <img
          src={isAlreadyInCart && isAlreadyInCart(sneaker.img) ? inCartIcon : toCartIcon}
          alt={inCart ? 'alreadyincart' : 'addtocart'}
        />
      </button>
    </div>
  );
};

export default SneakersItem;
