import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { MinusButtonIcons, PlusButtonIcons, AttentionIcons } from '../../../../iconFolder/icon';

const BuyTicketBlock = () => {
   const { tickets } = useSelector((state) => state.museumTicket);
   console.log(tickets[2].type !== 'standart', 444);
   return (
      <>
         <div className="BuyTicketBlock-list">
            <div className="BuyTicketBlock-listPar">
               {tickets.map((el, idx) => (
                  <div key={idx} className="BuyTicketBlock-list-menu">
                     <div>
                        <p>{el.type}</p>
                        {el.type !== 'standart' && (
                           <p className="attention">
                              <AttentionIcons />
                              <span>know more</span>
                           </p>
                        )}
                     </div>
                     <div className="BuyTicketBlock-list-Button">
                        <span>
                           <MinusButtonIcons />
                        </span>
                        <p>{el.count}</p>
                        <span>
                           <PlusButtonIcons />
                        </span>
                     </div>
                  </div>
               ))}
            </div>
            <div className="BuyTicketBlock-list-price">
               <p>Tour guide in Armenian language 1000 AMD</p>
               <p>Tour guide in a foreign language 1000 AMD</p>
               <p>To use the service of a tour guide, you need to make a reservation in advance.</p>
            </div>
         </div>
      </>
   );
};

export default memo(BuyTicketBlock);
