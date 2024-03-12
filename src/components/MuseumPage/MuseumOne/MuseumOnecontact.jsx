import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocationIcon, TelIcon } from '../../../iconFolder/icon';
const MuseumOnecontact = ({ working_days, region, director, address, phones }) => {
   const { t, i18n } = useTranslation();

   return (
      <div className="museumOne_pageStyle">
         <div>
            <h4>{t(`our_address`)}</h4>
            <p className="par-contactMinBlock">
               <span>
                  <LocationIcon />
               </span>
               {t(`${region}`)}
               {address}
            </p>
         </div>
         <div>
            <h4>{t(`working_hours`)}</h4>
            <p className="par-contactMinBlock">
               <span>
                  <LocationIcon />
               </span>
               {working_days}
            </p>
         </div>
         <div>
            <h4>{t(`director`)}</h4>
            <p className="par-contactMinBlock">
               <span>
                  <LocationIcon />
               </span>
               {director}
            </p>
         </div>
         <div>
            <h4>{t(`phone`)}</h4>

            {phones?.map((el, idx) => (
               <p key={idx} className="par-contactMinBlock">
                  <span>
                     <TelIcon width={17} />
                  </span>
                  {el}
               </p>
            ))}
         </div>
      </div>
   );
};

export default MuseumOnecontact;
