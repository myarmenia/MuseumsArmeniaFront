import React from 'react'
import './ButtonSecond.css'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom';

function ButtonSecond({txt,path}) {
  const lang = localStorage.getItem('lang');
  const navigate = useNavigate();

  const {t, i18n} = useTranslation()

  return (
    <NavLink to={`/${lang}/${path}`}>
      <button className="btn_2 draw-border_2">{t('buttons.' + txt)}</button>
    </NavLink>
  )
}

export default ButtonSecond