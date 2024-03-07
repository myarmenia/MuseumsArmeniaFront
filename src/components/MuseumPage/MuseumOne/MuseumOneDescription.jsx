import React from 'react'
import { useTranslation } from 'react-i18next'


const MuseumOneDescription = ({description, photos}) => {
   const { t, i18n } = useTranslation();
  
  return (
    <div className="museumOne_pageStyle">
      <h3>{t(`description_museum`)}...</h3>
      <p>{description}</p>
      <div className="MuseumOne_parent-imgList">
         {
            photos.map((el, idx) => <div key={idx}><img src={el} alt="imafes Museum" /></div>)
         }
      </div>
    </div>
  )
}

export default MuseumOneDescription