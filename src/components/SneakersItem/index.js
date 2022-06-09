import { useContext, useState } from 'react';
import toCartIcon from './add-to-cart.svg';
import inCartIcon from './added-to-cart.svg';
import unfavoritedIcon from './unfavorited.svg';
import favoritedIcon from './favorited.svg';
import AppContext from '../Context';

const SneakersItem = ({ id, img, price, title, sale }) => {
  const [inCart, setInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { sneakerToCart, isAlreadyInCart, priceMoreThan10, sneakerToFavorite, isAlreadyInFav } =
    useContext(AppContext);
  const salePrice = Math.floor(price * sale);
  const obj = sale ? { id, img, salePrice, title, price } : { id, img, price, title };

  const onClickPlus = () => {
    sneakerToCart(obj);
    setInCart(!inCart);
  };

  const onClickHeart = () => {
    sneakerToFavorite(obj);
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="sneakers__list-item">
      <button className="sneakers__list-item-favorite" onClick={onClickHeart}>
        <img
          src={isAlreadyInFav(img) ? favoritedIcon : unfavoritedIcon}
          alt={isFavorited ? 'favorited' : 'unfavorited'}
        />
      </button>
      <img src={img} alt={'sneaker' + id} className="sneakers__list-item-img" />
      <p>{title}</p>
      <span>Цена: {sale ? <b className="sneakers__list-item-prev"> {price}</b> : null}</span>
      <b className={sale ? 'sneakers__list-item-sale' : null}>
        {sale ? priceMoreThan10(salePrice) : priceMoreThan10(price)} руб.
      </b>
      <button className="sneakers__list-item-tocart" onClick={onClickPlus}>
        <img
          src={isAlreadyInCart(img) ? inCartIcon : toCartIcon}
          alt={inCart ? 'alreadyincart' : 'addtocart'}
        />
      </button>
    </div>
  );
};

export default SneakersItem;
