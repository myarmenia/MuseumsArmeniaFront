import React from 'react'
import NavMenu from '../NavMenu/NavMenu'
import { logo } from '../../images/images'
import './NavBar.css'
import ChangeFontSize from '../ChangeFontSize/ChangeFontSize'
import SelectLng from '../SelectLng/SelectLng'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NavBar({changeFonSize, changeFont}) {
  const {t, i18n} = useTranslation()

  const leng = localStorage.getItem('lang')

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
              <NavLink to={`/${leng}/login`}>{t('login_btn')}</NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavBar