import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
   postMuseumOnePages,
   educationalPrograms,
   getMuseumOneEvents,
} from '../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { getAuthUserAllMessages } from '../../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import { useTranslation } from 'react-i18next';
import { setIsOpen } from '../../../store/slices/NewMessagesSlice/NewMessagesSlice';
import { setModalTicketIsOpen, setTicketType } from '../../../store/slices/MuseumTicket/MuseumTicketSlice';


import { MuseumOneDescription, OurEvents, MuseumOnecontact, EducationalPrograms } from '../index';
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
   } = useSelector((state) => state.museumPages);

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
      tickets,
   } = dataMuseumOne;

   console.log('dataMuseumOne', dataMuseumOne);

   useEffect(() => {
      dispatch(postMuseumOnePages({ id }));
      dispatch(educationalPrograms({ id }));
      dispatch(getMuseumOneEvents({ id }));
      if (isAuth) {
         dispatch(getAuthUserAllMessages(id));
      }
   }, []);
  

   const openModal = useCallback(() => {
      dispatch(setIsOpen(true));
   }, []);

   const handleClickTicket = useCallback((kindOf, type) => {
      dispatch(setModalTicketIsOpen(true))
      dispatch(setTicketType({kindOf, type}))
   }, []);

   return (
      <>
         {loadingdataMuseumOne === 'loading' ? (
            <LoadSpinner />
         ) : loadingdataMuseumOne === 'fulfilled' ? (
            <div>
               <MuseumPageHeader headerImg={main_photo} title={name} />
               <div className="museumPage_section">
                  <div className="container">
                     <div className="museumOne_parent">
                        <div className="museumOne_parent-section1">
                           <div className="museumOne-blockLeft">
                              <MuseumOneDescription
                                 description={description}
                                 photos={photos}
                                 handleClickTicket={handleClickTicket}
                              />
                           </div>
                           <div className="museumOne-blockRigth ">
                              <MuseumOnecontact
                                 {...{ working_days, region, director, address, phones, links }}
                              />
                              <CustomButtonBlock
                                 icon={<MuseumAbonementIcons />}
                                 title={'webSideMusum.2'}
                                 text={'ButtonBlock.0'}
                                 background={'#D5AA72'}
                                 color={'#FFFFFF'}
                                 textBtn="10"
                                 onClick={() => handleClickTicket('ticket', 'Abonement ticket')}
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
                              />
                           </div>
                        </div>
                        {loadingMuseumOneEvents === 'fulfilled' && (
                           <OurEvents {...{ dataMuseumOneEvents }} />
                        )}

                        {educationalProgramsLoad === 'fulfilled' &&
                           dataEducationalPrograms.length > 0 && (
                              <EducationalPrograms
                                 dataEducationalPrograms={dataEducationalPrograms}
                              />
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
