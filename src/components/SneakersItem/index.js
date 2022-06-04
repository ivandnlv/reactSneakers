import React from 'react';
import toCartIcon from './add-to-cart.svg';
import inCartIcon from './added-to-cart.svg';
import unfavoritedIcon from './unfavorited.svg';
import favoritedIcon from './favorited.svg';

const SneakersItem = ({id, img, price, title}) => {
    return (
        <div className='sneakers__list-item'>
            <button className='sneakers__list-item-favorite'>
                <img src={unfavoritedIcon} alt="unfavorited"/>
            </button>
            <img src={img} alt={'sneaker' + id} className='sneakers__list-item-img'/>
            <p>{title}</p>
            <span>Цена:</span>
            <b>{price} руб.</b>
            <button className='sneakers__list-item-tocart'>
                    <img src={toCartIcon} alt="tocart" />
            </button>
        </div>
    );
};

export default SneakersItem;