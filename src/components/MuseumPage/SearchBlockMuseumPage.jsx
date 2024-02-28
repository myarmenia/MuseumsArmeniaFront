import React from 'react';
import { CaretDown } from '../../iconFolder/icon';
import { CaretUp } from '../../iconFolder/icon';
import Select, { components, ValueContainerProps } from 'react-select';
import { useTranslation } from 'react-i18next';


const SearchBlockMuseumPage = ({ regions }) => {
   const [activRegion, setActivRegion] = React.useState('Մարզեր');
   const [openList, setOpenList] = React.useState(false);
   const {t, i18n} = useTranslation()


   return (
      <div className="parent_searchBlock">
         <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <div className="searchBlock" onClick={() => setOpenList(!openList)}>
               <h4>{activRegion}</h4>
               {openList ? <CaretUp /> : <CaretDown />}
            </div>
            <div className="parent_listRegion" style={{
               transform: `rotateX(${openList ? '0deg' : '90deg'})`,
               transformOrigin: 'top'
            }}>
               <div className="listRegion">
                  {regions.map((el, idx) => (
                     <p key={idx}>{t(`${el}`)}</p>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchBlockMuseumPage;
