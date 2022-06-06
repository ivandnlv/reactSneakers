import React from 'react';
import emptyBox from './empty-box.png';
import Btn from '../../UI/Btn';

const EmptyCart = ({closeCart}) => {
    return (
        <div className='cart__empty'>
            <img src={emptyBox} alt="empty" />
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <Btn btnType={'back'} onClick={closeCart}>Вернуться назад</Btn>
        </div>
    );
};

export default EmptyCart;