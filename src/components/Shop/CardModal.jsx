import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
   getBasketLength,
   getBaskettotalPrice,
   getProductLength,
   getRedirectUrl,
   getSetAllBasketData,
   getSetBasketData,
   getSetModalIsOpenShop,
   getStorageProductId,
   removeElemBasket,
   setCardErrorModal,
   setModalIsOpenShop,
} from '../../store/slices/Shop/ShopSlice';
import './CardModal.css'; // Import CSS file for modal styles
import { useTranslation } from 'react-i18next';
import {
   getDelateProductBasket,
   postAllBasketDataDoingPurchase,
} from '../../store/slices/Shop/ShopApi';
import Trash from '../../images/Trash.svg';
import { customBasesUrlFunc } from '../MuseumPage/customBasesUrlFunc';

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
   const productLength = useSelector(getProductLength);
   const RedirectUrl = useSelector(getRedirectUrl);
   console.log(AllBasketData, 9999);
   useEffect(() => {
      document.body.style.overflow = ModalIsOpenShop ? 'hidden' : 'auto';
      return () => (document.body.style.overflow = 'auto');
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

   const sendBakstAllDataPayment = () => {
      let arr = [];
      AllBasketData.products.map((el, index) => {
         arr.push({
            type: 'product',
            product_id: el.product_id,
            quantity: el.quantity,
         });
      });
      AllBasketData.tickets.map((el, index) => {
         if (el.type === 'united') {
            arr.push({
               type: el.type,
               id: el.ticket_id,
               quantity: el.quantity,
               museum_ids: el.museum_ids,
            });
         } else {
            arr.push({
               type: el.type,
               id: el.ticket_id,
               quantity: el.quantity,
               ...(el.sub_type  && { sub_type: el.sub_type  }),
            });
         }
      });

      let sendObj = {
         request_type: 'cart',
         request_name: 'web',
         redirect_url: customBasesUrlFunc().baseUrl,
         items: arr,
      };

      dispatch(postAllBasketDataDoingPurchase(sendObj)).then((res) => {
         if (res.meta.requestStatus === 'fulfilled') {
            // console.log('RedirectUrl', res.payload.data.redirect_url);
            window.location.href = res.payload.data.redirect_url; 
         }
         else if (res.meta.requestStatus === 'rejected') {
            dispatch(setCardErrorModal(true));
         }
      });
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
   // console.log('AllBasketData', Array.isArray(AllBasketData.products));
   // console.log('AllBasketData', AllBasketData);
   // console.log('AllBasketData.products.length', AllBasketData.products.length);

   const ticketsType_for_private = t('ticketsType_for_private', { returnObjects: true })

   const totalCount = useMemo(() => {
      const productsTotal = (AllBasketData?.products || []).reduce(
          (acc, item) => acc + ((item?.total_price || 0)),
          0
      );
  
      const ticketsTotal = (AllBasketData?.tickets || []).reduce(
          (acc, item) => acc + ((item?.total_price || 0)),
          0
      );
  
      return productsTotal + ticketsTotal;
  }, [AllBasketData]);

   console.log(AllBasketData,666);
   

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
                     <p className="shop_icon_count">{productLength}</p>
                  </div>
                  <p style={{ fontSize: '20px' }}>{t('yourCartTitle')}</p>
               </div>
               <p onClick={closeModal} className="closeBtn_basket">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="25"
                     height="25"
                     fill="currentColor"
                     className="bi bi-x"
                     viewBox="0 0 16 16">
                     <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
               </p>
            </div>
            <div className={windowWidth < 1025 ? 'all_baskets_height' : 'all_baskets'}>
               {AllBasketData.products?.length !== 0 || AllBasketData.tickets?.length !== 0 ? (
                  <>
                     {AllBasketData.products?.map((el, index) => (
                        <div key={index} className="basket_box">
                           <div className="left_div_basket_box">
                              <img src={el.image} alt={el.name} className="basket_box_img" />
                              <div className="basket_box_div">
                                 <p>
                                    {/* <b>{el.name.length > 15 ? el.name.slice(0, 15) + '...' : el.name}</b> */}
                                    <b className="basket_box_div_name">{el.name}</b>
                                 </p>
                                 <p className="museumName">{el.museum_name}</p>
                                 <p>{el.quantity + '|' + el.total_price + ' AMD'}</p>
                              </div>
                           </div>
                           <p className="delate_button" onClick={() => removeElemBas(el.id)}>
                              <img src={Trash} alt="Trash" className="trash_icon" />
                              {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg> */}
                           </p>
                        </div>
                     ))}
                     {AllBasketData.tickets?.map((el, index) => (
                        <div key={index} className="basket_box_ticket">
                           <div>
                              {
                                 ticketsType_for_private.map(ticket => {
                                    if (Object.keys(ticket)[0] === el.type) {
                                       return <p key={el.id}>{Object.values(ticket)[0]} {el.name && '/ ' + el.name}</p>
                                    }
                                    else if (el.type === 'event-config' && Object.keys(ticket)[0] === 'event_config') {
                                       return <p key={el.id}>{Object.values(ticket)[0]} {el.name && '/ ' + el.name}</p>
                                    }

                                 })

                              }

                              {
                                 ticketsType_for_private.map(ticket => {
                                    if (Object.keys(ticket)[0] === el.sub_type) {
                                       return <p key={el.id}>{Object.values(ticket)[0]}</p>
                                    }

                                 })

                              }
                              <p className="museumName">{el.museum_name}</p>
                              <p>{el.date}</p>
                              <p>{el.quantity + '|' + el.total_price + ' AMD'}</p>
                           </div>
                           <p className="delate_button" onClick={() => removeElemBas(el.id)}>
                              <img src={Trash} alt="Trash" className="trash_icon" />
                              {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg> */}
                           </p>
                        </div>
                     ))}
                  </>
               ) : (
                  <div style={{ marginTop: '60px', textAlign: 'center' }}>
                     {t('shop_page_data.3')}
                  </div>
               )}
               <p style={{ textAlign: 'center' }}>{t('infoBuyTicket.4')} {totalCount} AMD</p>
            </div>
            <div className='checkout_delete_block'>
               <div className="checkout_btn" onClick={sendBakstAllDataPayment}>{t('cardCheckout')}</div>
               <button onClick={() => dispatch(getDelateProductBasket('all_items'))}>{t('cardDelte')}</button>
            </div>
         </div>
      </Modal>
   );
}

export default CardModal;
