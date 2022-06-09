import React, { useContext } from 'react';
import AppContext from '../Context';

const Pagination = () => {
  const { sneakersLength, sneakersShowCount, setCurrentPageNumber, currentPageNumber } =
    useContext(AppContext);
  const pages = [];

  for (let i = 1; i <= Math.ceil(sneakersLength / sneakersShowCount); i++) {
    pages.push(i);
  }

  const onPageClick = (e) => {
    const number = +e.target.textContent;
    setCurrentPageNumber(number);
  };

  return (
    <div className="pagination">
      {pages.map((number) => (
        <div
          className={number === currentPageNumber ? 'pagination__item current' : 'pagination__item'}
          key={number}
          onClick={(e) => onPageClick(e)}>
          {number}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
