import React, { useCallback, useEffect, useState } from 'react';
import NavMenu from '../NavMenu/NavMenu';
import { logo } from '../../images/images';
import './NavBar.css';
import ChangeFontSize from '../ChangeFontSize/ChangeFontSize';
import SelectLng from '../SelectLng/SelectLng';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getLogOut } from '../../store/slices/LogOutSlice/LogOutApi';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { logOutIcon } from '../../iconFolder/icon';
import ShopCard from '../../images/Bank.svg';
import {
  getProductLength,
  getSetBasketData,
  setModalIsOpenShop,
} from '../../store/slices/Shop/ShopSlice';

function NavBar({ changeFonSize, changeFont }) {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector(getIsAuth);
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const dispatch = useDispatch();

  // /////////////shop length/////////////////
  const productLength = useSelector(getProductLength);
  // //////////////end shop length///////////////////////

  const handleLogOut = async () => {
    dispatch(getLogOut());
  };
  const handleClickOpenModal = useCallback((e) => {
    e.stopPropagation();
    dispatch(setModalIsOpenShop(true));
  }, []);

  return (
    <div className="nav_bar">
      <div className="container">
        <div className="nav_bar_left_div">
          <NavLink to={`/${leng}/`}>
            <img src={logo} alt="logo" />
          </NavLink>
          <NavMenu />
        </div>

        <div className="nav_bar_right_div">
          <div className="shopIconDiv">
            <span className="shopIconLength">{productLength}</span>
            <img
              src={ShopCard}
              alt="shop-card"
              className="shop-card"
              onClick={handleClickOpenModal}
            />
          </div>
          <ChangeFontSize {...{ changeFonSize, changeFont }} />
          <SelectLng />
          {!isAuth && <NavLink to={`/${leng}/login`}>{t('login_btn')}</NavLink>}
          {isAuth && <span onClick={handleLogOut}>{logOutIcon}</span>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
