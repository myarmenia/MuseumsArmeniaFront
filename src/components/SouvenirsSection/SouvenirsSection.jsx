import React, { useCallback, useEffect, useRef } from 'react';
import { responsive2, souvenirsData } from '../../data/data';
import 'react-multi-carousel/lib/styles.css';
import './SouvenirsSection.css';
import Carousel from 'react-multi-carousel';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { starIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSouvinersProd } from '../../store/slices/SouvinersProdSlice/SouvinersProdApi';
import { selectSouvinersProd } from '../../store/slices/SouvinersProdSlice/SouvinersProdSlice';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import { postShopCardData } from '../../store/slices/Shop/ShopApi';
import { useNavigate } from 'react-router-dom';

function SouvenirsSection() {
  const navigate = useNavigate();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const { t, i18n } = useTranslation();
  const IsAuth = useSelector(getIsAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSouvinersProd());
  }, []);

  const respProd = useSelector(selectSouvinersProd);

  const handleClickOpenModal = useCallback((id, image, name, price, museumName) => {
    return (e) => {
      e.stopPropagation();
      console.log('IsAuth', IsAuth);
      if (IsAuth) {
        dispatch(setModalIsOpenShop(true));
        dispatch(postShopCardData({ id }));
      } else {
        // setErrorText(true);
        // window.location.href()
        // window.location.pathname = `/${leng}/login`;
        navigate(`/${leng}/login`)
      }
    };
  }, []);

  console.log(respProd.data, 'fffff');
  const product = respProd.data.map((el) => {
    return (
      <div
        key={el.id}
        onClick={() => navigate(`/${leng}/store/${el.id}`)}
        className="souvenir_item">
        <div className="souvenir_item_img_div">
          <img src={el.image} alt="souvenir" />

          <div className="souvenir_item_add_cart_div">
            <ButtonSecond txt="3" onClick={handleClickOpenModal(el.id)} />
          </div>
        </div>

        <div className="souvenir_item_info_div">
          <p>{el.name}</p>
          <p>{el.price} AMD</p>
        </div>
      </div>
    );
  });
  return (
    <div className="souvenirss_section">
      <div className="container">
        <div className="souvinirs_title_div">
          <h3>{t('souvenirs_title.0')}</h3>
          <h2>{t('souvenirs_title.1')}</h2>
        </div>
        <div className="souvenir_items">
          <Carousel
            showDots={true}
            responsive={responsive2}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">
            {product}
          </Carousel>
        </div>
        <div className="souvenir_items_seeMore_button">
          <ButtonSecond txt="1" path={'store'} />
        </div>
      </div>
    </div>
  );
}

export default SouvenirsSection;
