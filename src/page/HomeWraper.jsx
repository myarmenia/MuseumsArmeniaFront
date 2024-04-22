import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import FooterComponent from '../components/FooterComponent/FooterComponent';
import CardModal from '../components/Shop/CardModal';
import { getSetModalIsOpenShop } from '../store/slices/Shop/ShopSlice';
import { useSelector } from 'react-redux';
import ScrollUpButton from '../components/ScrollUpButton/ScrollUpButton';

function HomeWraper({ changeFonSize, changeFont }) {
  const { pathname } = useLocation();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);
  const [homeNavColor, setHomeNavColor] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
        if (window.scrollY > 0) {
          setHomeNavColor(true);
        } else {
          setHomeNavColor(false);
        }
    });
    window.scrollTo(0, 0);
  }, [homeNavColor]);


  return (
    <div className="home_wraper">
      <NavBar {...{ changeFonSize, changeFont, homeNavColor}}/>
      {ModalIsOpenShop && <CardModal />}
      <BurgerMenu/>
      <Outlet />
      <ScrollUpButton/>
      <FooterComponent />
      
    </div>
  );
}

export default HomeWraper;
