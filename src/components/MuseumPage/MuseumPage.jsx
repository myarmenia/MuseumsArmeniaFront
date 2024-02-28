import React, { useEffect } from 'react';
import { MuseumPageHeader, SearchBlockMuseumPage } from './index';
import { postMuseumPages } from '../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';

import './museumPage.css';

const MuseumPage = () => {
   const dispatch = useDispatch();
   const { loadingStatus, dataMuseum, regions } = useSelector((state) => state.museumPages);

   useEffect(() => {
      dispatch(postMuseumPages());
   }, []);

   console.log(dataMuseum);

   return (
      <>
         {loadingStatus === 'loading' ? (
            <LoadSpinner />
         ) : loadingStatus === 'fulfilled' ? (
            <div>
               <MuseumPageHeader />
               <div
                  className="museumPage_section"
                  style={{
                     height: '3000px',
                     backgroundColor: '#F8F8F8',
                  }}>
                  <div className="container section">
                     <SearchBlockMuseumPage regions={regions} />
                     
                  </div>
               </div>
            </div>
         ) : (
            <div>ինչվոր մի բան այն չի</div>
         )}
      </>
   );
};

export default MuseumPage;
