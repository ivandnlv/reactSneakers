import React, { useContext, useState } from 'react';
import CompleteOrder from '../CompleteOrder';
import AppContext from '../Context';
import EmptyCart from '../EmptyCart';
import NotEmptyCart from '../NotEmptyCart';
import closeIcon from './close.svg';

const Cart = ({closeCart, sum}) => {
    const {cartSneakers} = useContext(AppContext);
    const [orderComplete, setOrderComplete] = useState(false);

    return (
        <div className='overlay'>
            <div className="cart">
                <div className="cart__top">
                    <h1>Корзина</h1>
                    <button className='cart__close' onClick={closeCart}>
                        <img src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                {
                    cartSneakers.length === 0 && orderComplete === false ?
                    <EmptyCart closeCart={closeCart}/>
                    : cartSneakers.length === 0 && orderComplete === true ?
                    <CompleteOrder setOrderComplete={setOrderComplete}/>
                    : <NotEmptyCart sum={sum} setOrderComplete={setOrderComplete}/>
                }
            </div>
        </div>
    );
};

export default Cart;