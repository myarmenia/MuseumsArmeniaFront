import React from 'react';
import { useTranslation } from 'react-i18next';

const EducationalPrograms = () => {
   const { t, i18n } = useTranslation();
   return (
      <div className="museumOne_pageStyle">
         <h3 style={{ fontSize: '25px', letterSpacing: '1px' }}>{t(`educationalPrograms`)}</h3>
      </div>
   );
};

export default EducationalPrograms;
