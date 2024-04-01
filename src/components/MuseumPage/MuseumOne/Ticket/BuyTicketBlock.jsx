import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDataItems } from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';

import { MinusButtonIcons, PlusButtonIcons, AttentionIcons } from '../../../../iconFolder/icon';

const BuyTicketBlock = () => {
   const { tickets, dataItems } = useSelector((state) => state.museumTicket);
   const dispatch = useDispatch()

   const hendleClickItems = useCallback((dovnUp, obj)=> {
      dispatch(setDataItems({dovnUp, obj}))
   },[])
   const totalPrice = tickets.reduce((acum, item) => {
      return acum + (item.price * item.count) ?? 0;
      
   }, 0)
   
   return (
      <>
         <div className="BuyTicketBlock-list">
            <div className="BuyTicketBlock-listPar">
               {tickets.map((items, idx) => (
                  <div key={idx} className="BuyTicketBlock-list-menu">
                     <div>
                        <p>{items.type} - <span>{items.price} AMD</span></p>
                        
                        {items.type !== 'standart' && (
                           <p className="attention">
                              <AttentionIcons />
                              <span>know more</span>
                           </p>
                        )}
                     </div>
                     <div className="BuyTicketBlock-list-Button">
                        <span onClick={()=>hendleClickItems('down', items)}>
                           <MinusButtonIcons />
                        </span>
                        <p>{items.count}</p>
                        <span onClick={()=>hendleClickItems('up', items)}>
                           <PlusButtonIcons />
                        </span>
                     </div>
                  </div>
               ))}
            </div>
            {/* <div className="BuyTicketBlock-list-priceOne">
               <p>standart <span>1000 AMD</span></p>
               <p>discounted <span>500 AMD</span></p>
            </div> */}
            <div className="BuyTicketBlock-list-price">
               <div>
                  <p>
                     Tour guide in Armenian language <span>1000 AMD</span>
                  </p>
                  <p>
                     Tour guide in a foreign language <span>1000 AMD</span>
                  </p>
                  <p>
                     To use the service of a tour guide, you need to make a reservation in advance.
                  </p>
               </div>
            </div>
            <div className="BuyTicketBlock-list-totalPrice">
                           <p>TOTAL: <span>{totalPrice} AMD</span></p>
            </div>
         </div>
      </>
   );
};

export default memo(BuyTicketBlock);
