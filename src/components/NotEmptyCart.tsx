import React, { useContext, useEffect } from 'react';
import AppContext from './Context';
import Btn from '../UI/Btn';
import CartItem from './CartItem';

type NotEmptyCartProps = {
  sum: number;
  setOrderComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotEmptyCart: React.FC<NotEmptyCartProps> = ({ sum, setOrderComplete }) => {
  const { cartSneakers, priceMoreThan10, sneakersToOrders, setCartSneakers } =
    useContext(AppContext);

  function sale() {
    let sale = 0;

    if (cartSneakers && cartSneakers.length) {
      cartSneakers.forEach((item) => {
        if (item.sale) {
          sale += item.price - (item.price - item.price * item.sale);
          console.log(sale);
        }
      });
    }

    return sale;
  }

  const onClickOrder = () => {
    setOrderComplete(true);
    if (sneakersToOrders && setCartSneakers && cartSneakers) {
      sneakersToOrders(cartSneakers);
      setCartSneakers(null);
    }
  };

  return (
    <>
      <div className="cart__items">
        {cartSneakers?.map((item) => (
          <CartItem key={item.id} sneaker={item} />
        ))}
      </div>
      <div className="cart__total">
        <div className="cart__total-item">
          <span>Доставка</span>
          <div></div>
          <b>300 руб.</b>
        </div>
        {sale() !== 0 ? (
          <div className="cart__total-item sale">
            <span>Скидка</span>
            <div></div>
            <b>{sale()} руб.</b>
          </div>
        ) : null}

        <div className="cart__total-item">
          <span>Итого</span>
          <div></div>
          <b>{priceMoreThan10 && priceMoreThan10(sum + 300)} руб.</b>
        </div>
        <Btn btnType="go" onClick={onClickOrder}>
          Оформить заказ
        </Btn>
      </div>
    </>
  );
};

export default NotEmptyCart;
