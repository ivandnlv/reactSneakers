import React, { useContext } from 'react';
import AppContext from '../Context';
import EmptyCart from '../EmptyCart';
import NotEmptyCart from '../NotEmptyCart';
import closeIcon from './close.svg';

const Cart = ({closeCart, sum}) => {
    const {cartSneakers} = useContext(AppContext);

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
                    cartSneakers.length === 0 ?
                    <EmptyCart closeCart={closeCart}/>
                    :
                    <NotEmptyCart sum={sum}/>
                }
            </div>
        </div>
    );
};

export default Cart;