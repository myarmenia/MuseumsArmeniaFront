import React, { useCallback, useEffect, useState } from 'react';
import './SingleShop.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDataShop } from '../../store/slices/Shop/ShopApi';
import { getSingleShopDatas, getSingleShopLoading, setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { useTranslation } from 'react-i18next';
import CardModal from '../Shop/CardModal';

function SingleShop() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const params = useParams();
  const dispatch = useDispatch();
  const singleShopDatas = useSelector(getSingleShopDatas);
  const loading = useSelector(getSingleShopLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleDataShop(params.id));
  }, []);

  const SinglePage = (idd) => {
    navigate(`/${leng}/store/${idd}`);
    dispatch(getSingleDataShop(idd));
  };
  ////////////////////////////
  const [number, setNumber] = useState(1);

  const handleIncrement = () => {
    setNumber((prevNumber) => (prevNumber < 100 ? prevNumber + 1 : prevNumber));
  };

  const handleDecrement = () => {
    setNumber((prevNumber) => (prevNumber > 1 ? prevNumber - 1 : prevNumber));
  };
  // console.log(singleShopDatas.similar_products.length, 5555555);
  /////////////////////////////////
  // const handleClickOpenModal = useCallback((e)=>{
  //   e.stopPropagation()
  //   dispatch(setModalIsOpenShop(true))
  // },[])

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
          loading...
        </div>
      ) : (
        <div className="container">
          <div className="singleShop_All">
            <div className="singleShop_top">
              <img
                src={singleShopDatas.image}
                alt={singleShopDatas.name}
                className="singleShop_top_image"
              />
              <div className="singleShop_top_right">
                <h2>{singleShopDatas.name}</h2>
                <p className="singleShop_top_right_price">
                  {singleShopDatas.price}
                  {t('single_shop_page.0')}
                </p>
                <div className="number_and_button">
                  <div className="number-box">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={number}
                      onChange={(e) => setNumber(parseInt(e.target.value))}
                    />
                    <div className="arrows">
                      <span className="arrow" onClick={handleIncrement}>
                        &#9650;
                      </span>
                      <span className="arrow" onClick={handleDecrement}>
                        &#9660;
                      </span>
                    </div>
                  </div>
                  <ButtonSecond txt={3} />
                </div>
                <p className="singleShop_top_right_kategoria">
                  {t('single_shop_page.1')}: {singleShopDatas.product_category_id}
                </p>
              </div>
            </div>
            <div className="singleShop_bottom">
              <h3 className="singleShop_bottom_title">{t('single_shop_page.2')}</h3>
              <div className="singleShop_bottom_divs">
                {singleShopDatas?.similar_products && singleShopDatas.similar_products.length != 0
                  ? singleShopDatas.similar_products.map((el, index) => (
                      <div
                        className="shop-box-singleShop"
                        key={index}
                        onClick={() => SinglePage(el.id)}>
                        <div className="shop-box_img_singleShop">
                          <img src={el.image} alt={el.image} />

                          
                          <div className="souvenir_item_add_cart_div">
                            <ButtonSecond txt="3" 
                            // onClick={handleClickOpenModal}
                            />
                          </div>
                        </div>

                        <div className="shop-box_texts_div">
                          <p className="shop-box-title">
                            {el.name?.length > 35 ? el.name.slice(0, 35) + '...' : el.name}
                          </p>
                          <p className="shop-box-price">{el.price}</p>
                        </div>
                      </div>
                    ))
                  : t('single_shop_page.3')}
              </div>
            </div>
          </div>
          <CardModal />
        </div>
      )}
    </>
  );
}

export default SingleShop;
