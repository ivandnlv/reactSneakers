import React from 'react';
import Btn from '../../UI/Btn';
import SneakersItem from '../SneakersItem';
import closeIcon from './close.svg';

const Cart = ({closeCart}) => {
    return (
        <div className='overlay'>
            <div className="cart">
                <div className="cart__top">
                    <h1>Корзина</h1>
                    <button className='cart__close' onClick={closeCart}>
                        <img src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                <div className="cart__items">
                    <SneakersItem 
                        id={1}
                        title={'nike air force цвета капусты'}
                        img={'./img/sneakers/9.jpg'}
                        price={12000}
                    />
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
            </div>
        </div>
    );
};

export default Cart;