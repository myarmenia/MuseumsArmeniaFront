import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from '../../store/slices/NewMessagesSlice/NewMessagesSlice';
const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // width: '40%',
      
      // border: '2px solid red',
      boxShadow: 'inset 0 0 0 1px #cea670',
      color: '#000000',
      
   },
};
// Modal.setAppElement('#yourAppElement');

const MessagesModal = ({ children }) => {
   const { modalIsOpen } = useSelector((state) => state.messages);
   const [windowWidth, setWindowWidth] = useState(2000)
   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth)
         
      };
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    customStyles.content.width = windowWidth > 1200 ? '40%' : windowWidth < 800 ? '80%' : '60%'
   
   const dispatch = useDispatch();
   let subtitle;
   function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#000';
   }
   function closeModal() {
      dispatch(setIsOpen(false));
   }

   return (
      <Modal
         isOpen={modalIsOpen}
         // onAfterOpen={afterOpenModal}
         onRequestClose={closeModal}
         style={{...customStyles}}
         ariaHideApp={false}
         contentLabel="Example Modal">
         {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
         {/* <button onClick={closeModal}>close</button> */}
         {/* {components} */}
         {children}
      </Modal>
   );
};

export default MessagesModal;
