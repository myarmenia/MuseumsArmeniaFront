import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LocationIcon } from '../../iconFolder/icon';

const MuseumMinBlock = ({ id, address, name, photo, region, description }) => {
   const { t, i18n } = useTranslation();
   return (
      <div className="par_MuseumMinBlock">
         <Link to={`museum/${id}`}>
            <div className="MuseumMinBlock">
               <div className="MuseumMinBlock-parImg">
                  <div
                     className="MuseumMinBlock_img"
                     style={{
                        backgroundImage: `url(${photo})`,
                     }}>
                     {/* <div className="MuseumMinBlock_img-parLink">
                     <Link className="MuseumMinBlock_img-link" to={`museum/${id}`}>
                        {t(`musseumPage_title.2`)}
                     </Link>
                  </div> */}
                  </div>
               </div>
               <div className="par_MuseumMinBlock-description">
                  <div className="block-description">
                     <Link to={`museum/${id}`}>
                        <h5 className="museum_name">{name}</h5>
                     </Link>

                     {/* <p className="museum_description">{description.slice(0, 40)}...</p> */}
                     <p className="museum_region">
                        <LocationIcon width={10} height={14} fill={'#575757'} />
                        {t(`${region}`)}
                     </p>
                  </div>
               </div>
            </div>
         </Link>
      </div>
   );
};

export default memo(MuseumMinBlock);
