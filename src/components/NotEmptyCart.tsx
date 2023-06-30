import React from 'react';
import Btn from '../UI/Btn';
import CartItem from './CartItem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { priceMoreThan10 } from './App';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { resetCart } from '../redux/slices/cart';
import { setOrders } from '../redux/slices/orders';

type NotEmptyCartProps = {
  setOrderComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotEmptyCart: React.FC<NotEmptyCartProps> = ({ setOrderComplete }) => {
  const dispatch: AppDispatch = useDispatch();

  const { cartSneakers, finalPrice } = useTypedSelector((state) => state.cart);

  const onAddToOrders = () => {
    dispatch(setOrders(cartSneakers));
    dispatch(resetCart());
  };

  function sale() {
    let sale = 0;

    if (cartSneakers && cartSneakers.length) {
      cartSneakers.forEach((item) => {
        if (item.sale) {
          sale += item.price - Math.floor(item.price * item.sale);
        }
      });
    }

    return sale;
  }

  const onClickOrder = () => {
    setOrderComplete(true);
    onAddToOrders();
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
          <b>{priceMoreThan10 && priceMoreThan10(finalPrice + 300)} руб.</b>
        </div>
        <Btn btnType="go" onClick={onClickOrder}>
          Оформить заказ
        </Btn>
      </div>
    </>
  );
};

export default NotEmptyCart;
