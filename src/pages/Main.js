import { useContext } from 'react';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';
import SneakersSkeleton from '../components/SneakersSkeleton';
import AppContext from '../components/Context';

const Main = ({loading}) => {
    const {sneakers, isAlreadyInCart} = useContext(AppContext);

    return (
        <div className='sneakers'>
            <div className="sneakers__top">
                <h1>Все кроссовки</h1>
                <Search/>
            </div>
            <div className="sneakers__wrapper">
                <div className="sneakers__list">   
                    {loading ? 
                        [...Array(10)].map((item, index) => 
                            <SneakersSkeleton key={index}/>
                    ) :
                        sneakers.map(item => 
                            <SneakersItem 
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                img={item.img}
                                isAlreadyInCart={isAlreadyInCart(item.img) ? true : false}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;