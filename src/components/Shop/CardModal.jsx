import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getSetModalIsOpenShop, setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import './CardModal.css'; // Import CSS file for modal styles

const customStyles = {
  content: {
    top: '70px',
    left: 'auto',
    right: '0',
    bottom: '0',
    transform: 'translateY(0%)',
    background: 'transparent',
    // transition: 'all 2s ease',
    padding: '0',
    border: '0',
    // transition: 'transform 0.8s',
    minWidth: '400px',
    width: '25%', // Set the width as per your requirement
    height: '100vh', // Make the height equal to the entire page height
    overflowY: 'auto', // Enable vertical scrolling if content exceeds modal height
    // border: '2px solid gold',
    // boxShadow: 'inset 0 0 0 1px #cea670',
    color: '#000000',
  },
};

function CardModal() {
  const dispatch = useDispatch();
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);

  useEffect(() => {
    document.body.style.overflow = ModalIsOpenShop ? 'hidden' : 'visible';
  }, [ModalIsOpenShop]);

  const [windowWidth, setWindowWidth] = useState(2000);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  customStyles.content.top = windowWidth < 1025 ? '0' : '70px';

  function closeModal() {
    dispatch(setModalIsOpenShop(false));
  }

  return (
    <Modal
      isOpen={ModalIsOpenShop}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{ ...customStyles }}
      // overlayClassName="modal-overlay"
      // className={x ? 'modal-contentaa' : 'modal-content'}
      ariaHideApp={false}
      contentLabel="Example Modal">
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      {/* <button onClick={closeModal}>close</button> */}
      {/* {components} */}
      {/* {children} */}
      {/* <div className={ModalIsOpenShop ? 'testtt2' : 'testtt'}>asdasdasd</div> */}
      <div className={'xxx'}>
        asdasdasd
        <p className="aaa">hfjgjhgcfhcjfgfhjgcfhgjcfhgcfhjgfhghgffhgfhgfhg</p>
        <p className="aaa">hfjgjhgcfhcjfgfhjgcfhgjcfhgcfhjgfhghgffhgfhgfhg</p>
      </div>
    </Modal>
  );
}

export default CardModal;
