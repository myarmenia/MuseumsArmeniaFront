import React from 'react'
import './Button.css'
import { useTranslation } from 'react-i18next'

function Button({txt}) {

  const {t, i18n} = useTranslation()
  
  return (
    <button className="btn draw-border">{t('buttons.' + txt)}</button>
  )
}

export default Button