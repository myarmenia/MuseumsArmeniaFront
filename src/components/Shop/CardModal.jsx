import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBasketLength,
  getBaskettotalPrice,
  getSetAllBasketData,
  getSetBasketData,
  getSetModalIsOpenShop,
  getStorageProductId,
  removeElemBasket,
  setModalIsOpenShop,
} from '../../store/slices/Shop/ShopSlice';
import './CardModal.css'; // Import CSS file for modal styles
import { useTranslation } from 'react-i18next';
import { getDelateProductBasket } from '../../store/slices/Shop/ShopApi';

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
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);
  // const BasketData = useSelector(getSetBasketData);
  // const countProductBasket = useSelector(getBaskettotalPrice)
  // const getStorageProduct = useSelector(getStorageProductId);
  // console.log('BasketData', BasketData, );
  // console.log(getStorageProduct, 'getStorageProduct');
  const AllBasketData = useSelector(getSetAllBasketData);

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
  const removeElemBas = (id) => {
    dispatch(getDelateProductBasket(id));
  };

  /////////////shop length/////////////////
  // let CardArray = JSON.parse(localStorage.getItem('CardArray'));
  // let lengt = CardArray ? CardArray.length : 0;
  // console.log('leng', lengt);
  //////////////end shop length///////////////////////
  /////////////////general price////////////////////////////
  // let generalPrice = 0;

  ///////////////////////////////////////
  // console.log('BasketData', BasketData);
  console.log('AllBasketData', Array.isArray(AllBasketData.products));
  // console.log('AllBasketData.products.length', AllBasketData.products.length);

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
        <div className="all_baskets">
          <div className="all_baskets_top_card">
            <div className="card_top_all_baskets">
              <div className="shop_icon_with_count">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
                <p className="shop_icon_count">{AllBasketData.products?.length}</p>
              </div>
              <p>Your Cart</p>
            </div>
            <p onClick={closeModal} className="closeBtn_basket">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </p>
          </div>
          {AllBasketData.products?.length !== 0 ? (
            AllBasketData.products?.map((el, index) => (
              <div key={index} className="basket_box">
                <div className="left_div_basket_box">
                  <img src={el.image} alt={el.name} className="basket_box_img" />
                  <div className="basket_box_div">
                    <p>
                      {/* <b>{el.name.length > 15 ? el.name.slice(0, 15) + '...' : el.name}</b> */}
                      <b className="basket_box_div_name">{el.name}</b>
                    </p>
                    <i>
                      <b>Тangaran:</b>
                    </i>
                    <p className="museumName">{el.museum_name}</p>
                    <p>{el.quantity + '/' + el.total_price + ' amd'}</p>
                  </div>
                </div>
                <p className="delate_button" onClick={() => removeElemBas(el.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </p>
              </div>
            ))
          ) : (
            <div style={{ marginTop: '60px', textAlign: 'center' }}>{t('shop_page_data.3')}</div>
          )}
          {/* <p>total {countProductBasket}</p> */}
        </div>
      </div>
    </Modal>
  );
}

export default CardModal;
