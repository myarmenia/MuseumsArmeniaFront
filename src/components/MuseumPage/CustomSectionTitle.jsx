import React from 'react';

const CustomSectionTitle = ({ text, text2 = '' }) => {
   return (
      <div className="museumPage_section-title">
         <div className="museumPage_section-title-lines_div">
            <img src={require('../../images/Line 100.png')} alt="line" />
            <h2>{text}</h2>
            <img src={require('../../images/Line 100.png')} alt="line" />
         </div>
         <p>{text2}</p>
      </div>
   );
};

export default CustomSectionTitle;
