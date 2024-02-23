import React from 'react'
import NavMenu from '../NavMenu/NavMenu'
import { logo } from '../../images/images'
import './NavBarForHome.css'
import ChangeFontSize from '../ChangeFontSize/ChangeFontSize'
import SelectLng from '../SelectLng/SelectLng'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { userIcon } from '../../iconFolder/icon'

function NavBarForHome({homeNavColor, changeFonSize, changeFont}) {
    const isAuth = useSelector(getIsAuth)
    console.log(isAuth,'ddd');
    const {t, i18n} = useTranslation()
  const leng = localStorage.getItem('lang')
  return (
    <div className='nav_bar_for_home' style={{background: homeNavColor ? 'black' : 'transparent', opacity : homeNavColor ? '.7' : '1'}}>
       <div className='container'>
            <div className='nav_bar_for_home_left_div'>
              <img src={logo} alt="logo" />
              <NavMenu/>
            </div>
            <div className='nav_bar_for_home_right_div'>
              {isAuth && <div>{userIcon}</div>}
              <ChangeFontSize {...{changeFonSize, changeFont}}/>
              <SelectLng/>
              {!isAuth && <NavLink to={`/${leng}/login`}>{t('login_btn')}</NavLink>}
            </div>
        </div>
    </div>
  )
}

export default NavBarForHome