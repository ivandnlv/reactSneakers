import { ChangeEvent } from 'react';
import Btn from '../../UI/Btn';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addBrand, changeSale, changeSort, resetFilters } from '../../redux/slices/filters';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Brands } from '../../models/types/brands';

const Filters = () => {
  const dispatch: AppDispatch = useDispatch();

  const { filters } = useTypedSelector((state) => state.filters);

  const { sale } = filters;

  const onSortChange = (e: ChangeEvent) => {
    if (e.target instanceof HTMLSelectElement) {
      switch (e.target.value) {
        case 'asc':
          dispatch(changeSort({ sortBy: 'asc', sortField: 'price' }));
          break;
        case 'desc':
          dispatch(changeSort({ sortBy: 'desc', sortField: 'price' }));
          break;
        default:
          dispatch(changeSort({ sortBy: 'asc', sortField: 'id' }));
          break;
      }
    }
  };

  const onBrandChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (e.target instanceof HTMLInputElement) {
      dispatch(addBrand(e.target.name.toLowerCase() as Brands));
    }
  };

  const onOnlySaleChange = () => {
    dispatch(changeSale(!sale));
  };

  const onFiltersRemove = () => {
    dispatch(resetFilters());
  };

  return (
    <aside className="filters">
      <form action="#">
        <h2>Фильтры</h2>
        <div className="filters__sort">
          <span>Сортировка</span>
          <select name="sort" onChange={(e) => onSortChange(e)}>
            <option value="default">По умолчанию</option>
            <option value="asc">По возрастанию цены</option>
            <option value="desc">По убыванию цены</option>
          </select>
        </div>
        <div className="filters__brands">
          <span>Бренды</span>
          <div className="filters__brands-wrapper">
            <label>
              Adidas
              <input type="checkbox" name="Adidas" onClick={(e) => onBrandChange(e)} />
            </label>
            <label>
              Puma
              <input type="checkbox" name="Puma" onClick={(e) => onBrandChange(e)} />
            </label>
            <label>
              Nike
              <input type="checkbox" name="Nike" onClick={(e) => onBrandChange(e)} />
            </label>
            <label>
              Under Armour
              <input type="checkbox" name="Under Armour" onClick={(e) => onBrandChange(e)} />
            </label>
            <label>
              Jordan
              <input type="checkbox" name="Jordan" onClick={(e) => onBrandChange(e)} />
            </label>
          </div>
        </div>
        <label className="filters__sale">
          <b>Со скидкой</b>
          <input type="checkbox" onClick={onOnlySaleChange} />
        </label>
        <Btn onClick={onFiltersRemove} btnType="gray" type="reset">
          Сбросить
        </Btn>
      </form>
    </aside>
  );
};

export default Filters;
