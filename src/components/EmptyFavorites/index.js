import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import sadSmile from './smile.png';
import Btn from '../../UI/Btn';
import AppContext from '../Context';

const EmptyFavorites = () => {
    const {setCurrentPage} = useContext(AppContext);

    return (
        <div className='emptyfavorites'>
            <img src={sadSmile} alt="sad-smile" />
            <h1>Тут пусто {':('}</h1>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to="/">
                <Btn 
                    btnType={'back'} 
                    onClick={() => setCurrentPage('main')}
                >
                    Вернуться назад
                </Btn>
            </Link>
        </div>
    );
};

export default EmptyFavorites;