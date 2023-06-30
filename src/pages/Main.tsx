import { useEffect } from 'react';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';
import SneakersSkeleton from '../components/SneakersSkeleton';
// import AppContext from '../components/Context';
import Slider from '../components/Slider';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchSneakers, setPage } from '../redux/slices/sneakers';

const Main: React.FC = () => {
  // const { sneakers, isAlreadyInCart, sneakersFilters, searchValue } = useContext(AppContext);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('main'));
    dispatch(fetchSneakers());
  }, [dispatch]);

  const { sneakers, loading } = useTypedSelector((state) => state.sneakers);
  const { filteredSneakers, search } = useTypedSelector((state) => state.filters);

  return (
    <>
      <Slider />
      <div className="sneakers">
        <div className="sneakers__top">
          {search ? <h1>Поиск по запросу: {search}</h1> : <h1>Все кроссовки</h1>}
          <Pagination />
          <Search />
        </div>
        <div className="sneakers__wrapper">
          <div className="sneakers__list">
            {loading
              ? [...Array(6)].map((item, index) => <SneakersSkeleton key={index} />)
              : filteredSneakers
              ? filteredSneakers.map((sneaker) => (
                  <SneakersItem key={sneaker.id} sneaker={sneaker} />
                ))
              : sneakers
              ? sneakers.map((sneaker) => <SneakersItem key={sneaker.id} sneaker={sneaker} />)
              : 'Нет кроссовок'}
          </div>
          <Filters />
        </div>
        <div className="sneakers__pagination">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Main;
