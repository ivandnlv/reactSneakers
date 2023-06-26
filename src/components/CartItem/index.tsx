import React, { useContext } from 'react';
import AppContext from '../Context';
import deleteIcon from './delete.svg';
import { ICartSneaker } from '../../models/interfaces/sneaker';

type CartItemProps = {
  sneaker: ICartSneaker;
};

const CartItem: React.FC<CartItemProps> = ({ sneaker }) => {
  const { deleteFromCart, priceMoreThan10 } = useContext(AppContext);
  const { img, price, title, salePrice } = sneaker;

  const onClickDelete = () => {
    if (deleteFromCart) {
      deleteFromCart(sneaker);
    }
  };

  const finalPrice = () => {
    if (priceMoreThan10) {
      if (salePrice) {
        return priceMoreThan10(salePrice);
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
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default CartItem;
