import React, { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
   setDataItems,
   setTicketType,
   setStatusInfoModal,
   setModalTicketIsOpen,
   setResetDataItems,
} from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';

import { setModalIsOpenShop } from '../../../../store/slices/Shop/ShopSlice';
import { getShopIconBasketDatas } from '../../../../store/slices/Shop/ShopApi';
import { postMuseumTicket } from '../../../../store/slices/MuseumTicket/MuseumTicketApi';
import { postTicketCart } from '../../../../store/slices/Shop/ShopApi';
import { BuyTicketBlock, AbonementTicketBlock } from './index';
import ButtonSecond from '../../../ButtonSecond/ButtonSecond';

const TicketMuseumCatalog = () => {
   const dispatch = useDispatch();
   const [t, i18n] = useTranslation();
   const navigate = useNavigate();
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   const { ticketType, dataItems } = useSelector((state) => state.museumTicket);
   const { isAuth } = useSelector((store) => store.auth);
   const hendleClickItems = useCallback((dovnUp, obj) => {
      dispatch(setDataItems({ dovnUp, obj }));
   }, []);

   const HendleBuyTicket = useCallback(() => {
      const userToken = localStorage.getItem('token');
      if (dataItems.length) {
         if (isAuth) {
            dispatch(
               postMuseumTicket({
                  userToken,
                  postData: {
                     request_name: 'web',
                     items: dataItems,
                  },
               }),
            );
         } else {
            dispatch(setTicketType({ kindOf: 'form', type: 'Buy Ticket' }));
         }
      }
   }, [dataItems]);

   const HendleAddCart = useCallback(() => {
      if (dataItems.length) {
         if (isAuth) {
            const obj = {
               type: 'ticket',
               items: dataItems,
            };
            dispatch(postTicketCart(obj));
            dispatch(setModalTicketIsOpen(false));
            dispatch(setResetDataItems());

            dispatch(setModalIsOpenShop(true));

            // dispatch(getShopIconBasketDatas());
            // dispatch(setStatusInfoModal({ status: true, text: t(`isWrong.2`) }));
            // setTimeout(() => dispatch(setStatusInfoModal({ status: false, text: '' })), 2000);
         } else {
            navigate(`/${leng}/login`);
         }
      }
   }, [dataItems]);

   return (
      <div className="TicketMuseumCatalog-parent">
         <div className="TicketMuseumCatalog-header" style={{ textAlign: 'center' }}>
            <p>{ticketType.type === 'Buy Ticket' ? t(`infoBuyTicket.5`) : t(`infoBuyTicket.6`)}</p>
         </div>
         <div>
            {ticketType.type === 'Buy Ticket' ? (
               <BuyTicketBlock hendleClickItems={hendleClickItems} />
            ) : (
               <AbonementTicketBlock hendleClickItems={hendleClickItems} />
            )}
         </div>
         <div className="TicketMuseumCatalog-buttonBlock">
            <ButtonSecond
               txt="0"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               boxShadow={'none'}
               fontSize="12px"
               newClass="newStyleBtn"
               onClick={HendleBuyTicket}
            />
            <ButtonSecond
               txt="12"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               boxShadow={'none'}
               fontSize="12px"
               newClass="newStyleBtn"
               onClick={HendleAddCart}
            />
         </div>
      </div>
   );
};

export default memo(TicketMuseumCatalog);
