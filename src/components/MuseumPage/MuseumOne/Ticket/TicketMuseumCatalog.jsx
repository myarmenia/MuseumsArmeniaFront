import React, {memo} from 'react'
import { useSelector } from 'react-redux';

import {BuyTicketBlock, AbonementTicketBlock} from './index'
import ButtonSecond from '../../../ButtonSecond/ButtonSecond';


const TicketMuseumCatalog = () => {

   const {modalTicketIsOpen, ticketType, tickets} = useSelector((state) => state.museumTicket);
   
  return (
    <div className="TicketMuseumCatalog-parent">
      <div>
         <div className="TicketMuseumCatalog-header" style={{textAlign: 'center'}}>
            <p>{ticketType.type}</p>
         </div>
         <div>

            {
               ticketType.type === 'Buy Ticket' ? <BuyTicketBlock/> : <AbonementTicketBlock/>
            }
         </div>
         <div className="TicketMuseumCatalog-buttonBlock">
            <ButtonSecond txt='0'  background={'#D5AA72'}  color={'#FFFFFF'} boxShadow={'none'}  fontSize='12px' newClass='newStyleBtn'/>
            <ButtonSecond txt='12'  background={'#D5AA72'}  color={'#FFFFFF'} boxShadow={'none'} fontSize='12px' newClass='newStyleBtn'/>
         </div>
      </div>
    </div>
  )
}

export default memo(TicketMuseumCatalog)