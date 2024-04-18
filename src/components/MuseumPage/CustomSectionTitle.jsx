import React from 'react';

import { LineeIcons } from '../../iconFolder/icon';

const CustomSectionTitle = ({ text, text2 = '', color = '#cea670', colorSvg = '#cea670' }) => {
   return (
      <div className="museumPage_section-title">
         <div className="museumPage_section-title-lines_div">
            <LineeIcons fill={colorSvg} />
            <h2 style={{ color: color }}>{text}</h2>
            <LineeIcons fill={colorSvg} />
         </div>
         <p className="museumPage_section-title-text2" style={{ color: color }}>
            {text2}
         </p>
      </div>
   );
};

export default React.memo(CustomSectionTitle);
