import React, { memo } from 'react';
import { CaretDown } from '../../iconFolder/icon';
import { CaretUp } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { filterRegionMuseum } from '../../store/slices/MuseumPagesSlice/MuseumPagesSlice';

const SearchBlockMuseumPage = ({ regions }) => {
   const dispatch = useDispatch();
   const { t, i18n } = useTranslation();
   const [activRegion, setActivRegion] = React.useState({ name: 'Մարզեր', region: null });
   const [openList, setOpenList] = React.useState(false);

   const filter = React.useCallback((obj) => {
      setActivRegion(obj);
      setOpenList(false);
      dispatch(filterRegionMuseum(obj));
   }, []);

   return (
      <div className="parent_searchBlock">
         <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <div className="searchBlock" onClick={() => setOpenList(!openList)}>
               <h4>{activRegion.name}:</h4>
               {openList ? <CaretUp /> : <CaretDown />}
            </div>
            <div
               className="parent_listRegion"
               style={{
                  transform: `rotateX(${openList ? '0deg' : '90deg'})`,
                  transformOrigin: 'top',
               }}>
               <div >
                  <p className="searchOll"
                     onClick={() => filter({ name: 'Մարզեր', region: null })}
                     style={{
                        color: `${activRegion.region === null ? '#D5AA72' : '#000'}`,
                     }}
                  >Բոլորը</p>
                  <div className="listRegion">
                     {regions.map((el, idx) => (
                        <p
                           key={idx}
                           className="listRegion_p"
                           style={{
                              color: `${activRegion.region === el ? '#D5AA72' : '#000'}`,
                           }}
                           onClick={() => filter({ name: t(`${el}`), region: el })}>
                           {t(`${el}`)}
                        </p>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(SearchBlockMuseumPage);
