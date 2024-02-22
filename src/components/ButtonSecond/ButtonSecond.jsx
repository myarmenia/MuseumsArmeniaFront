import React from 'react'
import './ButtonSecond.css'
import { useTranslation } from 'react-i18next'

function ButtonSecond({txt}) {

  const {t, i18n} = useTranslation()

  return (
    <button className="btn_2 draw-border_2">{t('buttons.' + txt)}</button>
  )
}

export default ButtonSecond