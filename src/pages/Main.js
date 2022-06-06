import { useContext } from 'react';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';
import SneakersSkeleton from '../components/SneakersSkeleton';
import AppContext from '../components/Context';
import Filters from '../components/Filters';

const Main = ({loading}) => {
    const {sneakers, isAlreadyInCart, sneakersFilters} = useContext(AppContext);

    // let brands = '';
    // console.log(brands);
    // sneakersFilters.brands && sneakersFilters.brands.forEach(item => brands += item);
    // const filtredSneakers = sneakers.filter((item, i) => item.title.includes(brands));

    const sneakersFilter = () => {
        const {brands, onlySale, sort} = sneakersFilters;
        if (Object.keys(sneakersFilters).length !== 0) {
            if (brands.length !== 0 && !onlySale && sort === 'default') {
                return sneakers.filter(item => item.title.includes(...brands));
            } else if (brands.length !== 0 && onlySale && sort === 'default') {
                return sneakers.filter(item => item.sale && item.title.includes(...brands));

            } else if (brands.length === 0 && onlySale && sort === 'default') {
                return sneakers.filter(item => item.sale);

            } else if (brands.length !== 0 && !onlySale && sort === 'ascending') {
                const newArr = sneakers.filter(item => item.title.includes(...brands));
                return newArr.sort((a,b) => a.price > b.price ? 1 : -1);

            } else if (brands.length !== 0 && onlySale && sort === 'ascending') {
                const newArr = sneakers.filter(item => item.sale && item.title.includes(...brands));
                return newArr.sort((a,b) => a.price > b.price ? 1 : -1);

            } else if (brands.length === 0 && !onlySale && sort === 'ascending') {
                const newArr = sneakers.filter(item => item);
                return newArr.sort((a,b) => a.price > b.price ? 1 : -1);

            } else if (brands.length !== 0 && !onlySale && sort === 'descending') {
                const newArr = sneakers.filter(item => item.title.includes(...brands));
                return newArr.sort((a,b) => a.price > b.price ? -1 : 1);

            } else if (brands.length !== 0 && onlySale && sort === 'descending') {
                const newArr = sneakers.filter(item => item.sale && item.title.includes(...brands));
                return newArr.sort((a,b) => a.price > b.price ? -1 : 1);

            } else if (brands.length === 0 && !onlySale && sort === 'descending') {
                const newArr = sneakers.filter(item => item);
                return newArr.sort((a,b) => a.price > b.price ? -1 : 1);
            }
        } else return sneakers
    }

    return (
        <>
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
                            sneakersFilter().map(item => 
                                <SneakersItem 
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    img={item.img}
                                    sale={item.sale}
                                    isAlreadyInCart={isAlreadyInCart(item.img) ? true : false}
                                />
                            )
                        }
                    </div>
                    <Filters />
                </div>
                
            </div>
        </>
    );
};

export default Main;