import React, { useContext } from 'react';
import AppContext from '../Context';
import deleteIconPath from './delete.svg';
import { ISneaker } from '../../models/interfaces/sneaker';

type CartItemProps = {
  sneaker: ISneaker;
};

const CartItem: React.FC<CartItemProps> = ({ sneaker }) => {
  const { deleteFromCart, priceMoreThan10 } = useContext(AppContext);
  const { img, price, title, sale } = sneaker;

  const onClickDelete = () => {
    if (deleteFromCart) {
      deleteFromCart(sneaker);
    }
  };

  console.log(sneaker);

  const finalPrice = () => {
    if (priceMoreThan10) {
      if (sale) {
        return priceMoreThan10(price - price * sale);
      } else {
        return priceMoreThan10(price);
      }
    }
  };

  return (
    <div className="cart__item">
      <img src={img} alt={title} className="cart__item-image" />
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
