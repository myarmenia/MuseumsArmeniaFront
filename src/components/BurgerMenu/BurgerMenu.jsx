import React, { useCallback, useEffect, useRef, useState } from 'react'
import './BurgerMenu.css'
import NavMenu from '../NavMenu/NavMenu'
import SelectLng from '../SelectLng/SelectLng'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUser, getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { useTranslation } from 'react-i18next'
import { logOutIcon, userIcon } from '../../iconFolder/icon'
import { getShopIconBasketDatas } from '../../store/slices/Shop/ShopApi'
import { getProductLength, setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice'
import { getLogOut } from '../../store/slices/LogOutSlice/LogOutApi'
import ShopCard from '../../images/Bank.svg';

function BurgerMenu() {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector(getIsAuth);
  const isAuthCount = useSelector(getAuthUser);
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  const burgerMenuRef = useRef(null)

  const [check, setCheck] = useState(false)

   // /////////////shop length/////////////////
   const productLength = useSelector(getProductLength);
   // //////////////end shop length///////////////////////
 
   const handleLogOut = async () => {
     dispatch(getLogOut());
   };
   const handleClickOpenModal = useCallback((e) => {
     e.stopPropagation();
     dispatch(setModalIsOpenShop(true));
     dispatch(getShopIconBasketDatas());
   }, []);


   useEffect(() => {
    if (check) {
      burgerMenuRef.current.style.transform = 'none'
    }

    else{
      burgerMenuRef.current.style.transform = 'translate(-100%, 0)'
    }

   },[pathname, check])


   useEffect(() => {

    burgerMenuRef.current.style.transform = 'translate(-100%, 0)';
    setCheck(false)
}, [pathname]);

  return (
    <nav role="navigation" className='burger_menu'>
      <div id="menuToggle" >
        <input type="checkbox" checked={check} onChange={() => setCheck(!check)}/>
        <span ></span>
        <span ></span>
        <span></span>  

        <div ref={burgerMenuRef} className='burger_menu_content'>
          <NavMenu />

          <div className="burger_menu_icons_div">
          {!isAuth && <NavLink to={`/${leng}/login`}>{t('login_btn')}</NavLink>}
            <div className='burger_menu_icons'>
                {isAuth && (
                <div className="shopIconDiv" onClick={handleClickOpenModal}>
                  <span className="shopIconLength">{productLength || isAuthCount.card_count}</span>
                  <img
                    src={ShopCard}
                    alt="shop-card"
                    className="shop-card"

                  />
                </div>
              )}
              {isAuth && <Link to={`/${leng}/profilePage`}><div>{userIcon}</div></Link>}
              <SelectLng />
              {isAuth && <span onClick={handleLogOut}>{logOutIcon}</span>}
              
            </div>
        </div>
        </div>

        
      </div>
      
    </nav>
  )
}

export default BurgerMenu