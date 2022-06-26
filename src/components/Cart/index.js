import React, { useContext, useState, useRef } from 'react';
import CompleteOrder from '../CompleteOrder';
import AppContext from '../Context';
import EmptyCart from '../EmptyCart';
import NotEmptyCart from '../NotEmptyCart';
import closeIcon from './close.svg';

const Cart = ({ closeCart, sum }) => {
  const { cartSneakers } = useContext(AppContext);
  const [orderComplete, setOrderComplete] = useState(false);

  // Animations

  const [cartClosed, setCartClosed] = useState('cart');
  const [overlayHidden, setOverlayHidden] = useState('overlay');

  const cartOverlay = useRef(null);
  const cart = useRef(null);

  const onClickClose = () => {
    setCartClosed('cart hide');
    setTimeout(() => setCartClosed('cart hide hidden'), 190);
    setOverlayHidden('overlay hide');
    setTimeout(() => closeCart(), 190);
    // cart.classList.add('hide');
    // setTimeout(() => cart.classList.add('hidden'), 200);
    //
  };

  return (
    <div className={overlayHidden} ref={cartOverlay}>
      <div className={cartClosed} ref={cart}>
        <div className="cart__top">
          <h1>Корзина</h1>
          <button className="cart__close" onClick={onClickClose}>
            <img src={closeIcon} alt="closeIcon" />
          </button>
        </div>
        {cartSneakers.length === 0 && orderComplete === false ? (
          <EmptyCart closeCart={onClickClose} />
        ) : cartSneakers.length === 0 && orderComplete === true ? (
          <CompleteOrder setOrderComplete={setOrderComplete} />
        ) : (
          <NotEmptyCart sum={sum} setOrderComplete={setOrderComplete} />
        )}
      </div>
    </div>
  );
};

export default Cart;
