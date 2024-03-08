import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setMessagesType } from '../../store/slices/NewMessagesSlice/NewMessagesSlice';

const dataTypeMessages = ['educational_program', 'excursion', 'other'];

const TypeList = () => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();
   const onClickItem = useCallback((item) => {
      dispatch(setMessagesType(item));
   }, []);

   
   return (
      <div className="par_type">
         <div className="par_type-block">
            <h3 className="par_type-title">{t(`typeMessages`)}</h3>
            <ul className="par_type-list">
               {dataTypeMessages.map((item, idx) => (
                  <li className="par_type-item" key={idx} onClick={() => onClickItem(item)}>
                     {t(`${item}`)}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default TypeList;
