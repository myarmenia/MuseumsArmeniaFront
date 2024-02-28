import React from 'react'
import NavMenu from '../NavMenu/NavMenu'
import { logo } from '../../images/images'
import './NavBar.css'
import ChangeFontSize from '../ChangeFontSize/ChangeFontSize'
import SelectLng from '../SelectLng/SelectLng'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getLogOut } from '../../store/slices/LogOutSlice/LogOutApi'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { logOutIcon } from '../../iconFolder/icon'

function NavBar({changeFonSize, changeFont}) {
  const {t, i18n} = useTranslation()
  const isAuth = useSelector(getIsAuth)
  const leng = localStorage.getItem('lang')
  const dispatch = useDispatch()
  const handleLogOut = async() =>{
    dispatch(getLogOut())
  }
  return (
    <div className='nav_bar'>
       <div className='container'>
            <div className='nav_bar_left_div'>
              <img src={logo} alt="logo" />
              <NavMenu/>
            </div>
            
            <div className='nav_bar_right_div'>
                <ChangeFontSize {...{changeFonSize, changeFont}} />
                <SelectLng/>
                {!isAuth && <NavLink to={`/${leng}/login`}>{t('login_btn')}</NavLink>}
                {isAuth && <span onClick={handleLogOut}>{logOutIcon}</span>}
            </div>
        </div>
    </div>
  )
}

export default NavBar