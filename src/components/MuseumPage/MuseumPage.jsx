import React, { useEffect } from 'react';
import { MuseumPageHeader, SearchBlockMuseumPage } from './index';
import { postMuseumPages } from '../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';

import './museumPage.css';

const MuseumPage = () => {
   const dispatch = useDispatch();
   const { loadingStatus, dataMuseum, regions } = useSelector((state) => state.museumPages);

   useEffect(() => {
      dispatch(postMuseumPages());
   }, []);
   return (
      <div>
         <MuseumPageHeader />
         <div
            className="museumPage_section"
            style={{
               height: '3000px',
               backgroundColor: '#FDFDFD',
            }}>
            <div className="container">
               <SearchBlockMuseumPage regions={regions} />
            </div>
         </div>
      </div>
   );
};

export default MuseumPage;
