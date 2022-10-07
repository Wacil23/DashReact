import { Pagination } from '@mantine/core';
import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';


const Paginations = ({currentPage, itemsPerPage, length, onPageChange, currentColor }) => {

  
  const pageCount = Math.ceil(length / itemsPerPage);
  const pages = [];
  
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  return (
    <Pagination  className='place-content-center mt-20 dark:text-white' color={{currentColor}} total={pages.length} page={currentPage} onChange={onPageChange} withEdges />
  )
}

Paginations.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
}

export default Paginations