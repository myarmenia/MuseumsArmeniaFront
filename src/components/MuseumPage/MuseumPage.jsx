import React, { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MuseumPageHeader, SearchBlockMuseumPage, PaginationExample } from './index';
import { postMuseumPages } from '../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { useDispatch, useSelector } from 'react-redux';
import headerImg from '../../images/museumheaderBacground.jpeg';
import './museumPage.css';

const MuseumPage = () => {
   const dispatch = useDispatch();
   const { t, i18n } = useTranslation();
   const { loadingStatus, filterDataMuseum, regions } = useSelector((state) => state.museumPages);

   useEffect(() => {
      dispatch(postMuseumPages());
   }, []);

   return (
      <>
         {loadingStatus === 'loading' ? (
            <LoadSpinner />
         ) : loadingStatus === 'fulfilled' ? (
            <div style={{ minHeight: '100vh' }}>
               <MuseumPageHeader headerImg={headerImg} title={t(`navMenuItems.1`)} />
               <div
                  className="museumPage_section"
                  style={{
                     backgroundColor: '#ffffff',
                  }}>
                  <div className="museumPage_section-title">
                     <div className="museumPage_section-title-lines_div">
                        <img src={require('../../images/Line 100.png')} alt="" />
                        <h2>{t(`musseumPage_title.0`)}</h2>
                        <img src={require('../../images/Line 100.png')} alt="" />
                     </div>
                  </div>
                  <div className="container section">
                     <SearchBlockMuseumPage regions={regions} />
                     <PaginationExample filterDataMuseum={filterDataMuseum} />
                  </div>
               </div>
            </div>
         ) : (
            <div
               style={{
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
               <h3>Ինչ որ բան այն չէ !</h3>
            </div>
         )}
      </>
   );
};

export default memo(MuseumPage);
