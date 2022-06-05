import React, { useContext } from 'react';
import AppContext from '../Context';
import Btn from '../../UI/Btn';
import CartItem from '../CartItem';

const NotEmptyCart = () => {
    const {cartSneakers} = useContext(AppContext);

    return (
        <>
            <div className="cart__items">
                {cartSneakers.map(item => 
                    <CartItem 
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        img={item.img}
                        price={item.price}
                    />
                )}
            </div>
            <div className="cart__total">
                <div className="cart__total-item">
                    <span>Доставка</span>
                    <div></div>
                    <b>300 руб.</b>
                </div>
                <div className="cart__total-item sale">
                    <span>Скидка</span>
                    <div></div>
                    <b>500 руб.</b>
                </div>
                <div className="cart__total-item">
                    <span>Итого</span>
                    <div></div>
                    <b>10300 руб.</b>
                </div>
                <Btn type='go'>Оформить заказ</Btn>
            </div>
        </>
    );
};

export default NotEmptyCart;