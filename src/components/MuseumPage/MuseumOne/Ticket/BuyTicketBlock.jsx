import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDataItems } from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';
import { useTranslation } from 'react-i18next';
import { MinusButtonIcons, PlusButtonIcons, AttentionIcons } from '../../../../iconFolder/icon';

const BuyTicketBlock = ({ hendleClickItems }) => {
   const { tickets, dataItems, ticketLoading, success, responseMessages, paymentsUrl } =
      useSelector((state) => state.museumTicket);
   const { dataMuseumOne } = useSelector((state) => state.museumPages);
   const dispatch = useDispatch();
   const { t, i18n } = useTranslation();

   const totalPrice = tickets.reduce((acum, item) => {
      return acum + item.price * item.count ?? 0;
   }, 0);

   return (
      <>
         <div className="BuyTicketBlock-list">
            <div className="BuyTicketBlock-listPar">
               {tickets.map(
                  (items, idx) =>
                     items.type !== 'subscription' && (
                        <div key={idx} className="BuyTicketBlock-list-menu">
                           <div>
                              <p>
                                 {t(`${items.type}`)} - <span>{items.price} AMD</span>
                              </p>

                              {items.type !== 'standart' && (
                                 <p className="attention">
                                    <AttentionIcons />
                                    <span>{t(`infoBuyTicket.0`)}</span>
                                 </p>
                              )}
                           </div>
                           <div className="BuyTicketBlock-list-Button">
                              <span onClick={() => hendleClickItems('down', items)}>
                                 <MinusButtonIcons />
                              </span>
                              <p>{items.count}</p>
                              <span onClick={() => hendleClickItems('up', items)}>
                                 <PlusButtonIcons />
                              </span>
                           </div>
                        </div>
                     ),
               )}
            </div>
            {/* <div className="BuyTicketBlock-list-priceOne">
               <p>standart <span>1000 AMD</span></p>
               <p>discounted <span>500 AMD</span></p>
            </div> */}
            <div className="BuyTicketBlock-list-price">
               <div>
                  <p>
                     {t(`infoBuyTicket.1`)} <span>{dataMuseumOne.guide.am} AMD</span>
                  </p>
                  <p>
                     {t(`infoBuyTicket.2`)} <span>{dataMuseumOne.guide.other} AMD</span>
                  </p>
                  <p>{t(`infoBuyTicket.3`)}</p>
               </div>
            </div>
            <div className="BuyTicketBlock-list-totalPrice">
               <p>
                  TOTAL: <span>{totalPrice} AMD</span>
               </p>
            </div>
            {ticketLoading === 'rejected' && (
               <div className="BuyTicketBlock-list-warning">
                  {success === false && <p>{responseMessages}</p>}
               </div>
            )}
         </div>
      </>
   );
};

export default memo(BuyTicketBlock);
