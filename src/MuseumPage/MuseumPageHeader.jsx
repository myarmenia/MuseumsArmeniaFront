import React from 'react';
import headerImg from '../images/museumheaderBacground.jpeg';

import './museumPage.css';

const MuseumPageHeader = () => {
   return (
      <div className="museumPageHeader">
         <div
            className="parHeader_img"
            style={{
               top: '0',
            }}>
            <img
               src={headerImg}
               alt=""
               style={{
                  width: '100%',
               }}
            />
         </div>
         <div className="par_pageHeader-txt">
            <div className="par_txt">
               <h1>Թանգարաններ</h1>
            </div>
         </div>
      </div>
   );
};

export default MuseumPageHeader;
