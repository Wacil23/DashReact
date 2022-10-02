import { Pagination } from '@mantine/core';
import React from 'react';


const Paginations = ({currentPage, itemsPerPage, length, onPageChange }) => {

    const pageCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
        console.log(pages)
    }

  return (
    <Pagination total={pages.length} page={currentPage} onChange={onPageChange} withEdges />
  )
}

Paginations.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
}

export default Paginations