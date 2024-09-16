import React from 'react';
import Modal from 'react-modal';
import { CloseMessagesBtn } from '../../../../iconFolder/icon';

const museumTicketcustomStyles = {
   content: {
      top: '53%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'none',
      padding: '0',
   },
};

const MuseumTicketModal = ({ children, modalIsOpen, handleClickCloseModal }) => {
   return (
      <div>
         <Modal
            isOpen={modalIsOpen}
            style={{ ...museumTicketcustomStyles }}
            ariaHideApp={false}
            contentLabel="Example Modal">
            <div className="child_modallTicket">
               <div onClick={handleClickCloseModal} className="ticketModal-close">
                  <CloseMessagesBtn width="20px" height="20px" />
               </div>
               {children}
            </div>
         </Modal>
      </div>
   );
};

export default React.memo(MuseumTicketModal);
