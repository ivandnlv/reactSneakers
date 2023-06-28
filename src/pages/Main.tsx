import { useContext } from 'react';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';
import SneakersSkeleton from '../components/SneakersSkeleton';
import AppContext from '../components/Context';
import Slider from '../components/Slider';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { ISneaker } from '../models/interfaces/sneaker';

type MainProps = {
  loading: boolean;
  onSearchInputChange: (e: Event) => void;
  sneakers: ISneaker[] | null;
};

const Main: React.FC<MainProps> = ({ loading, onSearchInputChange }) => {
  const { sneakers, isAlreadyInCart, sneakersFilters, searchValue } = useContext(AppContext);

  const filteredSneakers = () => {
    if (sneakers) return sneakers;
    else return [];
  };

  return (
    <>
      <Slider />
      <div className="sneakers">
        <div className="sneakers__top">
          {searchValue ? <h1>Поиск по запросу: {searchValue}</h1> : <h1>Все кроссовки</h1>}
          <Pagination />
          <Search onSearchInputChange={onSearchInputChange} />
        </div>
        {/* <div className="sneakers__wrapper">
          <div className="sneakers__list">
            {loading
              ? [...Array(6)].map((item, index) => <SneakersSkeleton key={index} />)
              : filteredSneakers()
                  .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((item) => (
                    <SneakersItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      img={item.img}
                      sale={item.sale}
                      isAlreadyInCart={isAlreadyInCart && isAlreadyInCart(item.img) ? true : false}
                    />
                  ))}
          </div>
          <Filters />
        </div> */}
        <div className="sneakers__pagination">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Main;
