'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={onPageChange}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}