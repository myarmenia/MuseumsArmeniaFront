import React from 'react'
import { useTranslation } from 'react-i18next'
const OurEvents = () => {
   const { t, i18n } = useTranslation();
  return (
    <div className="museumOne_pageStyle">
      <h3>{t(`ourEvents`)}</h3>
    </div>
  )
}

export default OurEvents