import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
   postMuseumOnePages,
   educationalPrograms,
   getMuseumOneEvents,
} from '../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { getAuthUserAllMessages } from '../../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';
import { MuseumOneDescription, OurEvents, MuseumOnecontact, EducationalPrograms } from '../index';
import { useTranslation } from 'react-i18next';
import MuseumPageHeader from '../MuseumPageHeader';
import ButtonSecond from '../../ButtonSecond/ButtonSecond';
import MessagesModal from '../../NewMessages/MessagesModal';
import MuseumPageMessages from '../../NewMessages/MuseumPageMessages';
import CustomButtonBlock from './CustomButtonBlock';
import { setIsOpen } from '../../../store/slices/NewMessagesSlice/NewMessagesSlice';
import { MuseumAbonementIcons } from '../../../iconFolder/icon';
import MuseumTicketModal from './MuseumTicketModal';
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

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [ticketValue, setTicketValue]= useState(null);

   const openModal = useCallback(() => {
      dispatch(setIsOpen(true));
   }, []);

   const handleClickCloseModal = useCallback(() => {
      setModalIsOpen(false);
   }, []);

   const handleClickTicket = useCallback((arg) => {
      setTicketValue(arg)
      setModalIsOpen(true);
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
                              <MuseumOneDescription description={description} photos={photos} handleClickTicket={handleClickTicket}  />
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
                                 onClick={()=> handleClickTicket('abonementTicket')}
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
                     <MuseumTicketModal
                        modalIsOpen={modalIsOpen}
                        handleClickCloseModal={handleClickCloseModal}>
                        {
                           ticketValue === 'buyTicket' ? <div>buyTicket</div> : <div>Abonement ticket</div>
                        }
                     </MuseumTicketModal>
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
