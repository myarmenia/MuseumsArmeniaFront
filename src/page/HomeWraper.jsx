import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import FooterComponent from '../components/FooterComponent/FooterComponent';

function HomeWraper({ changeFonSize, changeFont }) {
  const { pathname } = useLocation();
  const leng = localStorage.getItem('lang');

  return (
    <div className="home_wraper">
      {pathname !== `/${leng}/` && <NavBar {...{ changeFonSize, changeFont }} />}
      <BurgerMenu />
      <Outlet />
      <FooterComponent />
    </div>
  );
}

export default HomeWraper;
