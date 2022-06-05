import React, { useContext } from 'react';
import AppContext from '../Context';
import Btn from '../../UI/Btn';
import CartItem from '../CartItem';

const NotEmptyCart = ({sum}) => {
    const {cartSneakers, priceMoreThan10} = useContext(AppContext);
    let sale = 0;

    cartSneakers.forEach(item => {
        if (item.salePrice) {
            sale += item.price - item.salePrice;
        } 
    });

    return (
        <>
            <div className="cart__items">
                {cartSneakers.map(item => 
                    <CartItem 
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        img={item.img}
                        price={item.salePrice ? item.salePrice : item.price}
                    />
                )}
            </div>
            <div className="cart__total">
                <div className="cart__total-item">
                    <span>Доставка</span>
                    <div></div>
                    <b>300 руб.</b>
                </div>
                {sale !== 0 ? 
                    <div className="cart__total-item sale">
                        <span>Скидка</span>
                        <div></div>
                        <b>{sale} руб.</b>
                    </div>
                : null
                }
                
                <div className="cart__total-item">
                    <span>Итого</span>
                    <div></div>
                    <b>{priceMoreThan10(sum + 300)} руб.</b>
                </div>
                <Btn type='go'>Оформить заказ</Btn>
            </div>
        </>
    );
};

export default NotEmptyCart;