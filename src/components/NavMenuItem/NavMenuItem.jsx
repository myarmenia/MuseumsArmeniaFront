import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './NavMenuItem.css'
import { useTranslation } from 'react-i18next';

function NavMenuItem({txt, path}) {
  const { t, i18n } = useTranslation();
  const leng = localStorage.getItem('lang')

  const {pathname} = useLocation()
  return (
    <li className='nav_menu_item'>
        <NavLink className={({isActive})=> isActive ? 'active-item':''} to={pathname === `/${leng}` ? path : `/${leng}${path}`}>{t('navMenuItems.'+ txt)}</NavLink>
    </li>
  )
}

export default NavMenuItem