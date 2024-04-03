import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const EducationalDropdown = ({ description, name, min_quantity, max_quantity, id, price }) => {
   const { t, i18n } = useTranslation();

   return (
      <div key={id} className="educationalPrograms-minBlock">
         <h4>{name}</h4>
         <div>
            <p>{description}</p>
            <div>
               <h4>{t(`NumberOfVisitors`)}</h4>
               <p className="educationalPrograms-minBlock_count">
                  <span>
                     {' '}
                     {t(`minCount`)} :<span>{min_quantity}</span>
                  </span>
                  <span>
                     {' '}
                     {t(`maxCount`)} :<span>{max_quantity}</span>
                  </span>
               </p>
            </div>
            <div>
               <p>
                  {t(`oneTicket`)} - {price}֏{' '}
               </p>
            </div>
         </div>
      </div>
   );
};

export default memo(EducationalDropdown);
