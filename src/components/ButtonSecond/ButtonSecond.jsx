import React from 'react';
import './ButtonSecond.css';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';


function ButtonSecond({
   txt,
   path,
   minWidth = '',
   maxWidth = '',
   onClick = () => {},
   background = '',
   color = '',
   boxShadow = '',
   fontSize='',
   newClass= '',
}) {
   const lang = localStorage.getItem('lang');
   const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  if (path) {
    return (
      <NavLink to={`/${lang}/${path}`}>
        <button className="btn_2 draw-border_2">{t('buttons.' + txt)}</button>
      </NavLink>
    );
  }

   return (
      <button
         onClick={onClick}
         style={{
            minWidth: minWidth,
            maxWidth: maxWidth,
            background: background,
            color: color,
            boxShadow: boxShadow,
            fontSize: fontSize
         }}
         className={`btn_2 draw-border_2 ${newClass}`}>
         {t('buttons.' + txt)}
      </button>
   );

}

export default ButtonSecond;
