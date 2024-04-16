import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import IsWrong from '../../IsWrong';
import { useTranslation } from 'react-i18next';
import { MinusButtonIcons, PlusButtonIcons, AttentionIcons } from '../../../../iconFolder/icon';

const BuyTicketBlock = ({ hendleClickItems }) => {
   const { tickets, ticketLoading, success, responseMessages } = useSelector(
      (state) => state.museumTicket,
   );
   const { dataMuseumOne } = useSelector((state) => state.museumPages);
   const { t, i18n } = useTranslation();

   const totalPrice = tickets.reduce((acum, item) => {
      return acum + item.price * item.count ?? 0;
   }, 0);

   return (
      <>
         <div className="BuyTicketBlock-list">
            <div className="BuyTicketBlock-listPar">
               {tickets.length > 0 ? (
                  tickets.map(
                     (items, idx) =>
                        items.type !== 'subscription' && (
                           <div key={idx} className="BuyTicketBlock-list-menu">
                              <div>
                                 <p>
                                    {t(`${items.type}`)} -{' '}
                                    <span
                                       style={{ color: items.price > 0 ? '#000000' : '#a6a6a6' }}>
                                       {items.price} {t(`single_shop_page.0`)}
                                    </span>
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
                                    <MinusButtonIcons width="40" height="40" />
                                 </span>
                                 <p style={{ color: items.count > 0 ? '#000000' : '#a6a6a6' }}>
                                    {items.count}
                                 </p>
                                 <span onClick={() => hendleClickItems('up', items)}>
                                    <PlusButtonIcons width="40" height="40" />
                                 </span>
                              </div>
                           </div>
                        ),
                  )
               ) : (
                  // <div>
                  //    <p>{t(`isWrong.1`)}</p>
                  // </div>
                  <IsWrong text={t(`isWrong.1`)} height={'auto'} />
               )}
            </div>
            {/* <div className="BuyTicketBlock-list-priceOne">
               <p>standart <span>1000 {t(`single_shop_page.0`)}</span></p>
               <p>discounted <span>500 {t(`single_shop_page.0`)}</span></p>
            </div> */}
            <div className="BuyTicketBlock-list-price">
               {dataMuseumOne.guide && (
                  <div>
                     <p>
                        {t(`infoBuyTicket.1`)}{' '}
                        <span>
                           {dataMuseumOne.guide.am} {t(`single_shop_page.0`)}
                        </span>
                     </p>
                     <p>
                        {t(`infoBuyTicket.2`)}{' '}
                        <span>
                           {dataMuseumOne.guide.other} {t(`single_shop_page.0`)}
                        </span>
                     </p>
                     <p>{t(`infoBuyTicket.3`)}</p>
                  </div>
               )}
            </div>
            <div className="BuyTicketBlock-list-totalPrice">
               <p>
                  {t(`infoBuyTicket.4`)} :{' '}
                  <span style={{ color: totalPrice > 0 ? '#000000' : '#a6a6a6' }}>
                     {' '}
                     {totalPrice} {t(`single_shop_page.0`)}
                  </span>
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
