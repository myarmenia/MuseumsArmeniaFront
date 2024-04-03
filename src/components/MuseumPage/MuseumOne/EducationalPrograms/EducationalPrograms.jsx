import React, {useState, memo} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EducationalDropdown from './EducationalDropdown';


const EducationalPrograms = ({ dataEducationalPrograms }) => {
   const { t, i18n } = useTranslation();
   
   return (
      <div className="museumOne_pageStyle">
        <div className="educationalPrograms-par">
        <h4 className="museumOne_title">{t(`educationalPrograms`)}</h4>
        <p>Contact the museum to order tickets for educational programs by message or call.</p>
         <div className="museumOne_pageStyle-parentMinBlock">
            {
               dataEducationalPrograms.map((el) => <EducationalDropdown key={el.id} {...el}/>)
            }
         </div>
        </div>
      </div>
   );
};

export default memo(EducationalPrograms);
