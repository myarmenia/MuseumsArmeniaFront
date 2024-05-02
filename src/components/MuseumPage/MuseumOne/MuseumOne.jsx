import React, { useEffect, useCallback, useState } from 'react';
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
import { setNotificationStatus } from '../../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import { customBasesUrlFunc } from '../customBasesUrlFunc';

import {
   MuseumOneDescription,
   OurEvents,
   MuseumOnecontact,
   EducationalPrograms,
   MuseumOneShop,
   MuseumOneVirtualTour,
   MuseumOneBranch,
   IsWrong,
   CustomNotification,
} from '../index';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';
import MuseumPageHeader from '../MuseumPageHeader';
import MuseumPageMessages from '../../NewMessages/MuseumPageMessages';
import CustomButtonBlock from './CustomButtonBlock';
import { MuseumAbonementIcons } from '../../../iconFolder/icon';
import { TicketMuseumBlock } from './Ticket';
import OutSideErrorModal from '../../OutSideErrorModal/OutSideErrorModal';

const MuseumOne = () => {
   const { t, i18n } = useTranslation();
   const { id } = useParams();
   const dispatch = useDispatch();
   const [openAboniment, setOpenAboniment] = useState(null);
   const [paramUrl, setParamUrl] = useState(null);
   const { isAuth } = useSelector((store) => store.auth);
   const { statusInfoModal, ticketType } = useSelector((state) => state.museumTicket);
   const {
      loadingdataMuseumOne,
      dataMuseumOne,
      dataEducationalPrograms,
      educationalProgramsLoad,
      loadingMuseumOneEvents,
      dataMuseumOneEvents,
      dataMuseumProducts,
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
      dispatch(setTicketType({ kindOf, type, ticketType: '' }));
   }, []);

   useEffect(() => {
      if (dataMuseumOne?.tickets) {
         setOpenAboniment(dataMuseumOne?.tickets.find((el) => el.type.includes('subscription')));
      }
   }, [dataMuseumOne]);
   useEffect(() => {
      const params = customBasesUrlFunc();
      if (params?.result) {
         setTimeout(() => {
            dispatch(
               setNotificationStatus({
                  species: params.result === 'OK',
                  open: true,
                  messages:
                     params.result === 'OK'
                        ? t(`notificationMessages.0`)
                        : t(`notificationMessages.1`),
               }),
            );
         }, 3000);
         setTimeout(() => {
            dispatch(setNotificationStatus(null));
         }, 8000);
      }
   }, []);

   console.log(paramUrl, 999);
   return (
      <>
         {statusInfoModal.status && <OutSideErrorModal txt={statusInfoModal.text} />}
         {loadingdataMuseumOne === 'loading' ? (
            <LoadSpinner />
         ) : loadingdataMuseumOne === 'fulfilled' ? (
            <div>
               <MuseumPageHeader headerImg={dataMuseumOne.main_photo} title={dataMuseumOne.name} />
               <div className="museumPage_sectionOne">
                  <div
                     className="container"
                     style={{
                        backgroundColor: '#ffffff',
                     }}>
                     <div className="museumOne_parent">
                        <div className="museumOne_parent-section1">
                           <div className="museumOne-blockLeft">
                              <MuseumOneDescription
                                 description={dataMuseumOne.description}
                                 photos={dataMuseumOne.photos}
                                 handleClickTicket={handleClickTicket}
                                 openBtn={true}
                                 ticketType={ticketType}
                              />
                           </div>
                           <div className="museumOne-blockRigth ">
                              <MuseumOnecontact {...dataMuseumOne} />
                              {openAboniment && (
                                 <CustomButtonBlock
                                    icon={<MuseumAbonementIcons />}
                                    title={'webSideMusum.2'}
                                    text={'ButtonBlock.0'}
                                    background={
                                       ticketType.type === 'Abonement ticket'
                                          ? '#3F3D56'
                                          : '#D5AA72'
                                    }
                                    color={'#FFFFFF'}
                                    textBtn="10"
                                    onClick={() => handleClickTicket('ticket', 'Abonement ticket')}
                                    newClass="newStyleBtn"
                                 />
                              )}

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

                        {/* {loadingMuseumProducts === 'fulfilled' && (
                           <MuseumOneShop dataMuseumProducts={dataMuseumProducts}  museumId={id} />
                        )} */}
                        <MuseumOneShop dataMuseumProducts={dataMuseumProducts} museumId={id} />

                        {dataMuseumOne.links?.virtual_tour && (
                           <MuseumOneVirtualTour virtual_tour={dataMuseumOne.links.virtual_tour} />
                        )}

                        {dataMuseumOne?.branches.length > 0 && (
                           <MuseumOneBranch branches={dataMuseumOne.branches} />
                        )}
                     </div>

                     <TicketMuseumBlock />
                     <MuseumPageMessages museumId={id} />
                     {/* {paramUrl && (
                        <CustomNotification
                           species={paramUrl === 'OK'}
                           messages={
                              'Your changes cannot be saved at this time.Please try again later.'
                           }
                        />
                     )} */}
                     <CustomNotification />
                  </div>
               </div>
            </div>
         ) : (
            <IsWrong text={t(`isWrong.0`)} />
         )}
      </>
   );
};

export default MuseumOne;
