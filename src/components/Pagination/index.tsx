import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setCurrentPage } from '../../redux/slices/pagination';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const Pagination = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentPage, pages } = useTypedSelector((state) => state.pagination);

  const onPageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.textContent) {
      const number = +e.target.textContent;
      dispatch(setCurrentPage(number));
    }
  };

  if (!pages || pages.length <= 1) return null;

  return (
    <div className="pagination">
      {pages.map((number) => (
        <div
          className={number === currentPage ? 'pagination__item current' : 'pagination__item'}
          key={number}
          onClick={(e) => onPageClick(e)}>
          {number}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
