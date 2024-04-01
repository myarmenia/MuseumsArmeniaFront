import React, {useCallback, memo} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setModalTicketIsOpen } from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';

import { MuseumTicketModal, TicketMuseumCatalog, TicketMuseumForm } from './index';

import './TicketMuseumBlock.css'

const TicketMuseumBlock = () => {
   const dispatch = useDispatch()
   const {modalTicketIsOpen, ticketType} = useSelector((state) => state.museumTicket);
  
   const handleClickCloseModal = useCallback(() => {
      dispatch(setModalTicketIsOpen(false))
   }, []);

   return (
      <MuseumTicketModal modalIsOpen={modalTicketIsOpen} handleClickCloseModal={handleClickCloseModal}>
         {ticketType.kindOf === 'ticket' ? <TicketMuseumCatalog/> : <TicketMuseumForm/>}
      </MuseumTicketModal>
   );
};

export default TicketMuseumBlock;
