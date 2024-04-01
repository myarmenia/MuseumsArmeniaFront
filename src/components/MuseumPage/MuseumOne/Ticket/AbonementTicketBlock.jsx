import React, { memo } from 'react';
import { AttentionIcons, MinusButtonIcons, PlusButtonIcons } from '../../../../iconFolder/icon';

const AbonementTicketBlock = () => {
   return (
      <div className="AbonementTicket">
         <div className="BuyTicketBlock-listPar">
            <div className="BuyTicketBlock-list-menu">
               <div>
                  <p>standart</p>
               </div>
               <div className="BuyTicketBlock-list-Button">
                  <span>
                     <MinusButtonIcons />
                  </span>
                  <p>0</p>
                  <span>
                     <PlusButtonIcons />
                  </span>
               </div>
            </div>
         </div>
         <div className="AbonementTicket_totalPrice">
            <p>
               10000 AMD
            </p>
               <span>Abonement ticket is unlimited access for 365 days.</span>
         </div>
      </div>
   );
};

export default memo(AbonementTicketBlock);
