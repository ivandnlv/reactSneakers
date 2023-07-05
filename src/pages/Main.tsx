import { useEffect } from 'react';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';
import SneakersSkeleton from '../components/SneakersSkeleton';
import slide1 from '../UI/Slider/slide1.jpg';
import slide2 from '../UI/Slider/slide2.jpg';
import Slider from '../UI/Slider';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchSneakersCount, setLastSneakerId } from '../redux/slices/pagination';
import { fetchSneakers, setPage } from '../redux/slices/sneakers';

const Main: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { lastSneakerId, currentPage, totalSneakersCount } = useTypedSelector(
    (state) => state.pagination,
  );

  useEffect(() => {
    dispatch(setPage('main'));
    dispatch(fetchSneakersCount());
    dispatch(fetchSneakers({ startId: lastSneakerId }));
  }, [dispatch]);

  useEffect(() => {
    if (lastSneakerId == totalSneakersCount) {
      dispatch(setLastSneakerId(1));
    }
  }, [lastSneakerId]);

  useEffect(() => {
    dispatch(fetchSneakers({ startId: lastSneakerId }));
  }, [currentPage]);

  const { sneakers, loading } = useTypedSelector((state) => state.sneakers);
  const { filteredSneakers, search } = useTypedSelector((state) => state.filters);

  return (
    <>
      <Slider>
        <img src={slide1} alt="slide1" />
        <img src={slide2} alt="slide2" />
      </Slider>
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
