import { useContext, useState } from 'react';
import toCartIcon from './add-to-cart.svg';
import inCartIcon from './added-to-cart.svg';
import unfavoritedIcon from './unfavorited.svg';
import favoritedIcon from './favorited.svg';
import AppContext from '../Context';

const SneakersItem = ({id, img, price, title}) => {
    const [inCart, setInCart] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const {sneakerToCart, isAlreadyInCart} = useContext(AppContext);
    const obj = {id, img, price, title};

    const onClickPlus = () => {
        sneakerToCart(obj);
        setInCart(!inCart);
    }

    const onClickHeart = () => {
        setIsFavorited(!isFavorited);
    }

    return (
        <div className='sneakers__list-item'>
            <button className='sneakers__list-item-favorite' onClick={onClickHeart}>
                <img src={isFavorited ? favoritedIcon : unfavoritedIcon} alt={isFavorited ? 'favorited' : 'unfavorited'}/>
            </button>
            <img src={img} alt={'sneaker' + id} className='sneakers__list-item-img'/>
            <p>{title}</p>
            <span>Цена:</span>
            <b>{price} руб.</b>
            <button className='sneakers__list-item-tocart' onClick={onClickPlus}>
                    <img src={isAlreadyInCart(img) ? inCartIcon : toCartIcon} alt={inCart ? 'alreadyincart' : 'addtocart'} />
            </button>
        </div>
    );
};

export default SneakersItem;