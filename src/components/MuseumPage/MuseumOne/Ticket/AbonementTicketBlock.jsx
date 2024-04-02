import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition } from 'react';

import { AttentionIcons, MinusButtonIcons, PlusButtonIcons } from '../../../../iconFolder/icon';
import { useTranslation } from 'react-i18next';

const AbonementTicketBlock = ({ hendleClickItems }) => {
   const [t, i18n] = useTranslation();
   const { tickets, dataItems } = useSelector((state) => state.museumTicket);

   const totalPrice = tickets.reduce((acum, item) => {
      return acum + item.price * item.count ?? 0;
   }, 0);

   return (
      <>
         {tickets.map(
            (items, idx) =>
               items.type === 'subscription' && (
                  <div key={idx} className="AbonementTicket">
                     <div className="BuyTicketBlock-listPar">
                        <div className="BuyTicketBlock-list-menu">
                           <div>
                              <p>
                                 {t(`standart`)} -{' '}
                                 <span style={{ color: items.price > 0 ? '#000000' : '#a6a6a6' }}>
                                    {items.price} {t(`single_shop_page.0`)}
                                 </span>
                              </p>
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
                     </div>
                     <div className="AbonementTicket_totalPrice">
                        <div className="BuyTicketBlock-list-totalPrice">
                           <p>
                              {t(`infoBuyTicket.4`)} :{' '}
                              <span style={{ color: totalPrice > 0 ? '#000000' : '#a6a6a6' }}>
                                 {' '}
                                 {totalPrice} {t(`single_shop_page.0`)}
                              </span>
                           </p>
                        </div>
                        <span>{t(`infoBuyTicket.7`)}</span>
                     </div>
                  </div>
               ),
         )}
      </>
   );
};

export default memo(AbonementTicketBlock);
