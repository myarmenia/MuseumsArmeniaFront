import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
   postMuseumOnePages,
   educationalPrograms,
   getMuseumOneEvents,
   getMuseumOneProducts,
} from '../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { getAuthUserAllMessages } from '../../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import { useTranslation } from 'react-i18next';
import { setIsOpen } from '../../../store/slices/NewMessagesSlice/NewMessagesSlice';
import {
   setModalTicketIsOpen,
   setTicketType,
} from '../../../store/slices/MuseumTicket/MuseumTicketSlice';

import {
   MuseumOneDescription,
   OurEvents,
   MuseumOnecontact,
   EducationalPrograms,
   MuseumOneShop,
   MuseumOneVirtualTour,
} from '../index';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';
import MuseumPageHeader from '../MuseumPageHeader';
import MuseumPageMessages from '../../NewMessages/MuseumPageMessages';
import CustomButtonBlock from './CustomButtonBlock';
import { MuseumAbonementIcons } from '../../../iconFolder/icon';
import { TicketMuseumBlock } from './Ticket';

const MuseumOne = () => {
   const { t, i18n } = useTranslation();
   const { id } = useParams();
   const dispatch = useDispatch();
   const { isAuth, authUser } = useSelector((store) => store.auth);

   const {
      loadingStatus,
      loadingdataMuseumOne,
      dataMuseumOne,
      dataEducationalPrograms,
      educationalProgramsLoad,
      loadingMuseumOneEvents,
      dataMuseumOneEvents,
      dataMuseumProducts,
      loadingMuseumProducts,
   } = useSelector((state) => state.museumPages);

   useEffect(() => {
      dispatch(postMuseumOnePages({ id }));
      dispatch(educationalPrograms({ id }));
      dispatch(getMuseumOneEvents({ id }));
      dispatch(getMuseumOneProducts({ museumId: id }));
      if (isAuth) {
         dispatch(getAuthUserAllMessages(id));
      }
   }, [id]);

   const openModal = useCallback(() => {
      dispatch(setIsOpen(true));
   }, []);

   const handleClickTicket = useCallback((kindOf, type) => {
      dispatch(setModalTicketIsOpen(true));
      dispatch(setTicketType({ kindOf, type }));
   }, []);

   return (
      <>
         {loadingdataMuseumOne === 'loading' ? (
            <LoadSpinner />
         ) : loadingdataMuseumOne === 'fulfilled' ? (
            <div>
               <MuseumPageHeader headerImg={dataMuseumOne.main_photo} title={dataMuseumOne.name} />
               <div className="museumPage_section">
                  <div className="container">
                     <div className="museumOne_parent">
                        <div className="museumOne_parent-section1">
                           <div className="museumOne-blockLeft">
                              <MuseumOneDescription
                                 description={dataMuseumOne.description}
                                 photos={dataMuseumOne.photos}
                                 handleClickTicket={handleClickTicket}
                              />
                           </div>
                           <div className="museumOne-blockRigth ">
                              <MuseumOnecontact {...dataMuseumOne} />
                              <CustomButtonBlock
                                 icon={<MuseumAbonementIcons />}
                                 title={'webSideMusum.2'}
                                 text={'ButtonBlock.0'}
                                 background={'#D5AA72'}
                                 color={'#FFFFFF'}
                                 textBtn="10"
                                 onClick={() => handleClickTicket('ticket', 'Abonement ticket')}
                                 newClass="newStyleBtn"
                              />

                              <CustomButtonBlock
                                 icon={<MuseumAbonementIcons />}
                                 title={'haveQuestions'}
                                 text={'ButtonBlock.1'}
                                 background={'#3F3D56'}
                                 color={'#FFFFFF'}
                                 boxShadow={'none'}
                                 textBtn="11"
                                 onClick={openModal}
                                 newClass="newStyleBtn"
                              />
                           </div>
                        </div>

                        {loadingMuseumOneEvents === 'fulfilled' &&
                           dataMuseumOneEvents.length > 0 && (
                              <OurEvents {...{ dataMuseumOneEvents }} />
                           )}

                        {educationalProgramsLoad === 'fulfilled' &&
                           dataEducationalPrograms.length > 0 && (
                              <EducationalPrograms
                                 dataEducationalPrograms={dataEducationalPrograms}
                              />
                           )}

                        {loadingMuseumProducts === 'fulfilled' &&
                           dataMuseumProducts.dataProducts.length > 0 && (
                              <MuseumOneShop dataMuseumProducts={dataMuseumProducts} />
                           )}

                        {dataMuseumOne.links?.virtual_tour && (
                           <MuseumOneVirtualTour virtual_tour={dataMuseumOne.links.virtual_tour} />
                        )}
                     </div>

                     <TicketMuseumBlock />
                     <MuseumPageMessages museumId={id} />
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
