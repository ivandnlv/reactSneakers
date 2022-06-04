import { useContext } from 'react';
import AppContext from '../components/Context';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';

const Main = ({sneakers}) => {
    // const {sneakers} = useContext(AppContext);
    console.log(sneakers)
    return (
        <div className='sneakers'>
            <div className="sneakers__top">
                <h1>Все кроссовки</h1>
                <Search/>
            </div>
            <div className="sneakers__wrapper">
                <div className="sneakers__list">   
                    {
                        sneakers.map(item => 
                            <SneakersItem 
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                img={item.img}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;