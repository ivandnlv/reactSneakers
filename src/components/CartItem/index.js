import React, { useContext } from 'react';
import AppContext from '../Context';
import deleteIcon from './delete.svg';

const CartItem = ({img, title, price, id}) => {
    const {deleteFromCart} = useContext(AppContext);
    const obj = {img, title, price, id};

    const onClickDelete = () => {
        deleteFromCart(obj);
    }

    return (
        <div className='cart__item'>
            <img src={img} alt={title} className="cart__item-image"/>
            <div className="cart__item-content">
                <p>{title}</p>
                <div className="cart__item-content-price">
                    <span><b>{price} руб.</b></span>
                </div>
            </div>
            <button className='cart__item-delete' onClick={onClickDelete}>
                <img src={deleteIcon} alt="delete" />
            </button>
        </div>
    );
};

export default CartItem;