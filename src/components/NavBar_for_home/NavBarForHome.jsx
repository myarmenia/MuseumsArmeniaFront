import React, { useCallback } from 'react';
import NavMenu from '../NavMenu/NavMenu';
import { logo } from '../../images/images';
import './NavBarForHome.css';
import ChangeFontSize from '../ChangeFontSize/ChangeFontSize';
import SelectLng from '../SelectLng/SelectLng';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { logOutIcon, userIcon } from '../../iconFolder/icon';
import { getLogOut } from '../../store/slices/LogOutSlice/LogOutApi';
import ShopCard from '../../images/Bank.svg';
import { getProductLength, setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import { getShopIconBasketDatas } from '../../store/slices/Shop/ShopApi';

function NavBarForHome({ homeNavColor, changeFonSize, changeFont }) {
  const isAuth = useSelector(getIsAuth);
  const { t, i18n } = useTranslation();
  const leng = localStorage.getItem('lang');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await dispatch(getLogOut());
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');

    window.location.pathname = `/${leng}/login`;
  };

  // /////////////shop length/////////////////
  const productLength = useSelector(getProductLength);
  // //////////////end shop length///////////////////////

  const handleClickOpenModal = useCallback((e) => {
    e.stopPropagation();
    dispatch(setModalIsOpenShop(true));
    dispatch(getShopIconBasketDatas());
  }, []);
  return (
    <div
      className="nav_bar_for_home"
      style={{
        background: homeNavColor ? 'black' : 'transparent',
        opacity: homeNavColor ? '.7' : '1',
      }}>
      <div className="container">
        <div className="nav_bar_for_home_left_div">
          <img src={logo} alt="logo" className="nav_bar_logo_" />
          <NavMenu />
        </div>
        <div className="nav_bar_for_home_right_div">
          <div className="shopIconDiv">
            <span className="shopIconLength">{productLength}</span>
            <img
              src={ShopCard}
              alt="shop-card"
              className="shop-card"
              onClick={handleClickOpenModal}
            />
          </div>
          {isAuth && <div>{userIcon}</div>}
          <ChangeFontSize {...{ changeFonSize, changeFont }} />
          <SelectLng />
          {!isAuth ? (
            <NavLink to={`/${leng}/login`}>{t('login_btn')}</NavLink>
          ) : (
            <span onClick={handleLogOut}>{logOutIcon}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBarForHome;
