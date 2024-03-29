import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import FooterComponent from '../components/FooterComponent/FooterComponent';
import CardModal from '../components/Shop/CardModal';
import { getSetModalIsOpenShop } from '../store/slices/Shop/ShopSlice';
import { useSelector } from 'react-redux';

function HomeWraper({ changeFonSize, changeFont }) {
  const { pathname } = useLocation();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);

  return (
    <div className="home_wraper">
      {pathname !== `/${leng}/` && <NavBar {...{ changeFonSize, changeFont }} />}
      {ModalIsOpenShop && <CardModal />}
      <BurgerMenu />
      <Outlet />
      <FooterComponent />
    </div>
  );
}

export default HomeWraper;
