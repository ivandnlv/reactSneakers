import {useContext, useState} from 'react';
import Btn from '../../UI/Btn';
import AppContext from '../Context';

const Filters = () => {
    const {setSneakersFilters} = useContext(AppContext);

    const [filters, setFilters] = useState({
        brands: [],
        onlySale: false,
        sort: 'default'
    });

    const onSortChange = (e) => {
        setFilters({...filters, sort: e.target.value});
    }

    const onBrandChange = (e) => {
        if (e.target.checked) {
            setFilters({...filters, brands: [...filters.brands, e.target.name]});
        } else {
            setFilters({...filters, brands: filters.brands.filter(item => item !== e.target.name)})
        }
    }

    const onOnlySaleChange = () => {
        setFilters({...filters, onlySale: !filters.onlySale});
    }

    const onFiltersSubmit = (e) => {
        e.preventDefault();
        const {brands, onlySale, sort} = filters;
        if (brands.length === 0 && !onlySale && sort === 'default') {
            setSneakersFilters({});
        } else setSneakersFilters(filters);
    }

    const onFiltersRemove = () => {
        setFilters({
            brands: [],
            onlySale: false,
            sort: 'default'
        });
        setSneakersFilters({});
    }

    return (
        <aside className='filters'>
            <form action="#">
                <h2>Фильтры</h2>
                <div className='filters__sort'>
                    <span>Сортировка</span>
                    <select name="sort" onChange={(e) => onSortChange(e)}>
                        <option value="default">По умолчанию</option>
                        <option value="ascending">По возрастанию цены</option>
                        <option value="descending">По убыванию цены</option>
                    </select>
                </div>
                <div className='filters__brands'>
                    <span>Бренды</span>
                    <div className="filters__brands-wrapper">
                        <label>
                            Adidas
                            <input type="checkbox" name="Adidas" onClick={(e) => onBrandChange(e)}/>
                        </label>
                        <label>
                            Puma
                            <input type="checkbox" name="Puma" onClick={(e) => onBrandChange(e)}/>
                        </label>
                        <label>
                            Nike
                            <input type="checkbox" name="Nike" onClick={(e) => onBrandChange(e)}/>
                        </label>
                        <label>
                            Under Armour
                            <input type="checkbox" name="Under Armour" onClick={(e) => onBrandChange(e)}/>
                        </label>
                        <label>
                            Jordan
                            <input type="checkbox" name="Jordan" onClick={(e) => onBrandChange(e)}/>
                        </label>
                    </div>
                </div>
                <label className="filters__sale">
                    <b>Со скидкой</b>
                    <input type="checkbox" onClick={onOnlySaleChange}/>
                </label>
                <Btn onClick={(e) => onFiltersSubmit(e)}>Применить</Btn>
                <Btn onClick={onFiltersRemove}btnType="gray" type="reset">Сбросить</Btn>
            </form>
        </aside>
    );
};

export default Filters;