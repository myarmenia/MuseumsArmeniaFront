import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


const MuseumMinBlock = ({ id ,address, name, photo, region}) => {
   
   const {t, i18n} = useTranslation()
  return (
    <div className="par_MuseumMinBlock">
      <Link to={`museum/${id}`}>
         <div className="MuseumMinBlock">
            <div className="MuseumMinBlock_img" style={{
               backgroundImage: `url(${photo})`
            }}>
               
            </div>
            <div className="par_MuseumMinBlock-description">
               <div className="block-description">
                  <h5 className="museum_name">{name}</h5>
                  <p className="museum_region">{t(`${region}`)}</p>
               </div>
            </div>
         </div>
      </Link>
    </div>
  )
}

export default memo(MuseumMinBlock)