import React, { useState, useEffect, memo } from 'react';
import MuseumMinBlock from './MuseumMinBlock';
function PaginationExample({ filterDataMuseum }) {
   // массив как свойство
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

   useEffect(() => {
      // Обновляем компонент при изменении текущей страницы
      displayItems();
   }, [currentPage, filterDataMuseum]); // Обновляем компонент при изменении текущей страницы и массива

   const displayItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const pageItems = filterDataMuseum.slice(startIndex, startIndex + itemsPerPage); // Используем переданный массив
      return pageItems.map((item, index) => <MuseumMinBlock {...item} key={item.id} />);
   };

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   const numPages = Math.ceil(filterDataMuseum.length / itemsPerPage); // Используем длину переданного массива

   return (
      <>
         <div className="par_museumList">{displayItems()}</div>

         <div className="par_museum_pagButton">
            {Array.from({ length: numPages }, (_, index) => (
               <button
                  className="museum_pagButton"
                  style={{
                     backgroundColor: `${currentPage === index + 1 ? '#D5AA72' : '#ffffff'}`,
                  }}
                  key={index}
                  onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
               </button>
            ))}
         </div>
      </>
   );
}

export default memo(PaginationExample);
