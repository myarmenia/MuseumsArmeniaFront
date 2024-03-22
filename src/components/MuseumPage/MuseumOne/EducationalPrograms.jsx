import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const EducationalPrograms = ({ dataEducationalPrograms }) => {
   const { t, i18n } = useTranslation();
   
   return (
      <div className="museumOne_pageStyle">
         <h3>{t(`educationalPrograms`)}</h3>
         <div className="museumOne_pageStyle-parentMinBlock">
            {dataEducationalPrograms.map(
               ({ description, name, min_quantity, max_quantity, id, price}) => (
                  <div key={id} className="educationalPrograms-minBlock">
                     <h4>{name}</h4>
                     <p>{description}</p>
                     <div>
                        <h4>{t(`NumberOfVisitors`)}</h4>
                        <p className="educationalPrograms-minBlock_count">
                          <span> {t(`minCount`)} :<span>{min_quantity}</span></span>
                          <span> {t(`maxCount`)} :<span>{max_quantity}</span></span>
                        </p>
                     </div>
                     <div>
                        <p>{t(`oneTicket`)} - {price}֏ </p>
                     </div>
                  </div>
               ),
            )}
         </div>
      </div>
   );
};

export default EducationalPrograms;
