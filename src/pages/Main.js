import { useContext } from 'react';
import SneakersItem from '../components/SneakersItem';
import Search from '../UI/Search/Search';
import SneakersSkeleton from '../components/SneakersSkeleton';
import AppContext from '../components/Context';
import Slider from '../components/Slider';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const Main = ({ loading, onSearchInputChange }) => {
  const { sneakers, isAlreadyInCart, sneakersFilters, searchValue } = useContext(AppContext);

  const sneakersFilter = () => {
    const { brands, onlySale, sort } = sneakersFilters;

    const haveBrands = (item) => {
      for (let i = 0; i < brands.length; i++) {
        if (item.title.includes(brands[i])) return item;
      }
    };

    if (Object.keys(sneakersFilters).length !== 0) {
      if (brands.length !== 0 && !onlySale && sort === 'default') {
        return sneakers.filter((item) => haveBrands(item));
      } else if (brands.length !== 0 && onlySale && sort === 'default') {
        return sneakers.filter((item) => haveBrands(item));
      } else if (brands.length === 0 && onlySale && sort === 'default') {
        return sneakers.filter((item) => haveBrands(item));
      } else if (brands.length !== 0 && !onlySale && sort === 'ascending') {
        const newArr = sneakers.filter((item) => haveBrands(item));
        return newArr.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (brands.length !== 0 && onlySale && sort === 'ascending') {
        const newArr = sneakers.filter((item) => item.sale && haveBrands(item));
        return newArr.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (brands.length === 0 && !onlySale && sort === 'ascending') {
        const newArr = sneakers.filter((item) => item);
        return newArr.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (brands.length === 0 && onlySale && sort === 'ascending') {
        const newArr = sneakers.filter((item) => item.sale);
        return newArr.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (brands.length !== 0 && !onlySale && sort === 'descending') {
        const newArr = sneakers.filter((item) => haveBrands(item));
        return newArr.sort((a, b) => (a.price > b.price ? -1 : 1));
      } else if (brands.length !== 0 && onlySale && sort === 'descending') {
        const newArr = sneakers.filter((item) => item.sale && haveBrands(item));
        return newArr.sort((a, b) => (a.price > b.price ? -1 : 1));
      } else if (brands.length === 0 && !onlySale && sort === 'descending') {
        const newArr = sneakers.filter((item) => item);
        return newArr.sort((a, b) => (a.price > b.price ? -1 : 1));
      } else if (brands.length === 0 && onlySale && sort === 'descending') {
        const newArr = sneakers.filter((item) => item.sale);
        return newArr.sort((a, b) => (a.price > b.price ? -1 : 1));
      }
    } else return sneakers;
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
        <div className="sneakers__wrapper">
          <div className="sneakers__list">
            {loading
              ? [...Array(6)].map((item, index) => <SneakersSkeleton key={index} />)
              : sneakersFilter()
                  .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((item) => (
                    <SneakersItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      img={item.img}
                      sale={item.sale}
                      isAlreadyInCart={isAlreadyInCart(item.img) ? true : false}
                    />
                  ))}
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
