import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const EducationalPrograms = ({ dataEducationalPrograms }) => {
   const { t, i18n } = useTranslation();

   return (
      <div className="museumOne_pageStyle">
         <h3>{t(`educationalPrograms`)}</h3>
         <div>
            {dataEducationalPrograms.map(
               ({ description, name, min_quantity, max_quantity, id }) => (
                  <div key={id} className="educationalPrograms-minBlock">
                     <h4>{name}</h4>
                     <p>{description}</p>
                     <div>
                        <h4>{t(`NumberOfVisitors`)}</h4>
                        <p className="educationalPrograms-minBlock_count">
                           {t(`minCount`)} :<span>{min_quantity}</span>
                           {t(`maxCount`)} :<span>{max_quantity}</span>
                        </p>
                     </div>
                  </div>
               ),
            )}
         </div>
      </div>
   );
};

export default EducationalPrograms;
