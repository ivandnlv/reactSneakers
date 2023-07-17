import React from 'react';
import deleteIconPath from './delete.svg';
import { ISneaker } from '../../models/interfaces/sneaker';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { priceMoreThan10 } from '../App';
import { removeFromCart } from '../../redux/slices/cart';

type CartItemProps = {
  sneaker: ISneaker;
};

const CartItem: React.FC<CartItemProps> = ({ sneaker }) => {
  const dispatch: AppDispatch = useDispatch();

  // const { deleteFromCart, priceMoreThan10 } = useContext(AppContext);
  const { imgUrl, price, title, sale } = sneaker;

  const onClickDelete = () => {
    dispatch(removeFromCart(sneaker));
  };

  const finalPrice = () => {
    if (priceMoreThan10) {
      if (sale) {
        return priceMoreThan10(Math.floor(price * sale));
      } else {
        return priceMoreThan10(price);
      }
    }
  };

  return (
    <div className="cart__item">
      <img src={imgUrl} alt={title} className="cart__item-image" />
      <div className="cart__item-content">
        <p>{title}</p>
        <div className="cart__item-content-price">
          <span>
            <b>{finalPrice()} руб.</b>
          </span>
        </div>
      </div>
      <button className="cart__item-delete" onClick={onClickDelete}>
        <img src={deleteIconPath} alt="delete" />
      </button>
    </div>
  );
};

export default CartItem;
