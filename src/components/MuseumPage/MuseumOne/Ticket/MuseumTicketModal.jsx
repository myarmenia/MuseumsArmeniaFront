import React, { useSelector, useEffect } from 'react';
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
      // width: '400px'
      padding: '0',
   },
};

const MuseumTicketModal = ({ children, modalIsOpen, handleClickCloseModal }) => {
   // const [windowWidth, setWindowWidth] = useState(2000);
   // useEffect(() => {
   //    const handleResize = () => {
   //       setWindowWidth(window.innerWidth);
   //    };
   //    window.addEventListener('resize', handleResize);

   //    // Cleanup function to remove event listener on component unmount
   //    return () => {
   //       window.removeEventListener('resize', handleResize);
   //       dispatch(setIsOpen(false));
   //    };
   // }, []);
   //  customStyles.content.width = windowWidth > 1200 ? '40%' : windowWidth < 800 ? '80%' : '60%'

   return (
      <div>
         <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={}
            style={{ ...museumTicketcustomStyles }}
            ariaHideApp={false}
            contentLabel="Example Modal">
            <div className="child_modallTicket">
               <div onClick={handleClickCloseModal} className="ticketModal-close">
                  <CloseMessagesBtn width="15px" height="15px" />
               </div>
               {children}
            </div>
         </Modal>
      </div>
   );
};

export default MuseumTicketModal;
