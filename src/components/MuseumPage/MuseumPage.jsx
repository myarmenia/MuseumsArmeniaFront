import React, { useEffect, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
   MuseumPageHeader,
   SearchBlockMuseumPage,
   PaginationExample,
   CustomSectionTitle,
   MuseumMinBlock,
} from './index';
import { postMuseumPages } from '../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { useDispatch, useSelector } from 'react-redux';
import abouteUsBack from '../../images/abouteUsBack.jpg';
import './museumPage.css';

const MuseumPage = () => {
   const dispatch = useDispatch();
   const params = useParams();
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
            <div style={{ minHeight: '100vh', backgroundImage: `url(${abouteUsBack})` }}>
               {/* <MuseumPageHeader headerImg={headerImg} title={t(`navMenuItems.1`)} /> */}
               <div className="museumPage_section">
                  <CustomSectionTitle
                     text={t(`musseumPage_title.0`)}
                     text2={t(`mintitle`)}
                     color="#FFFFFF"
                     colorSvg="#FFFFFF"
                  />
                  <div
                     className="container section"
                     style={{
                        backgroundColor: '#ffffff',
                     }}>
                     <SearchBlockMuseumPage regions={regions} />
                     <div className="par_museumList">
                        {filterDataMuseum.map((item, index) => (
                           <MuseumMinBlock {...item} key={item.id} />
                        ))}
                     </div>
                     {/* <PaginationExample filterDataMuseum={filterDataMuseum} /> */}
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
