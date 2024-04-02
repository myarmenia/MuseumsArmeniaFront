import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AttentionIcons, MinusButtonIcons, PlusButtonIcons } from '../../../../iconFolder/icon';

const AbonementTicketBlock = ({hendleClickItems}) => {
   const { tickets, dataItems } = useSelector((state) => state.museumTicket);

   return (
      <>
         {tickets.map(
            (items, idx) =>
               items.type === 'subscription' && (
                  <div key={idx} className="AbonementTicket">
                     <div className="BuyTicketBlock-listPar">
                        <div className="BuyTicketBlock-list-menu">
                           <div>
                              <p>standart</p>
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
                        <p>{items.price} AMD</p>
                        <span>Abonement ticket is unlimited access for 365 days.</span>
                     </div>
                  </div>
               ),
         )}
      </>
   );
};

export default memo(AbonementTicketBlock);
