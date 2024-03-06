import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
   postMuseumOnePages,
   educationalPrograms,
} from '../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';
import { MuseumOneDescription, OurEvents, MuseumOnecontact, EducationalPrograms } from '../index';
import { useTranslation } from 'react-i18next';
import MuseumPageHeader from '../MuseumPageHeader';
import Button from '../../Button/Button';


const MuseumOne = () => {
   const { t, i18n } = useTranslation();
   const { id } = useParams();
   const dispatch = useDispatch();

   const { loadingStatus, dataMuseumOne } = useSelector((state) => state.museumPages);

   const {
      main_photo,
      name,
      address,
      description,
      director,
      links,
      phones,
      photos = [],
      region,
      working_days,
   } = dataMuseumOne;

   useEffect(() => {
      dispatch(postMuseumOnePages({ id }));
      dispatch(educationalPrograms({ id }));
   }, []);

   return (
      <>
         {loadingStatus === 'loading' ? (
            <LoadSpinner />
         ) : loadingStatus === 'fulfilled' ? (
            <div>
               <MuseumPageHeader headerImg={main_photo} title={name} />
               <div
                  className="museumPage_section"
                  style={{
                     height: 'auto',
                     backgroundColor: '#F8F8F8',
                  }}>
                  <div className="container">
                     <div className="museumOne_parent" style={{}}>
                        <div className="museumOne-blockLeft">
                           <MuseumOneDescription description={description} photos={photos} />
                           <OurEvents />
                           <EducationalPrograms />
                        </div>
                        <div className="museumOne-blockRigth ">
                           <MuseumOnecontact
                              {...{ working_days, region, director, address, phones }}
                           />
                           <div className="museumOne_pageStyle">
                              <h4>{t(`haveQuestions`)}</h4>
                              <Button txt='4'/>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <div>ինչվոր մի բան այն չի</div>
         )}
      </>
   );
};

export default MuseumOne;
