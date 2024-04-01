import React, { memo } from 'react';
import { CaretDown } from '../../iconFolder/icon';
import { DownIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { filterRegionMuseum } from '../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import { FilterIcon, LocationIcon } from '../../iconFolder/icon';

const SearchBlockMuseumPage = ({ regions }) => {
   const dispatch = useDispatch();
   const { t, i18n } = useTranslation();
   const [activRegion, setActivRegion] = React.useState({
      name: t(`RegionsMussseum`),
      region: null,
   });
   const [openList, setOpenList] = React.useState(false);

   const filter = React.useCallback((obj) => {
      setActivRegion(obj);
      setOpenList(false);
      dispatch(filterRegionMuseum(obj));
   }, []);

   return (
      <div className="parent_searchBlock">
         <div style={{ width: '100%', position: 'relative' }}>
            <div className="parent_searchBlock-title">
               <FilterIcon />
               <p>{t(`musseumPage_title.1`)}</p>
            </div>
            <div className="searchBlock" onClick={() => setOpenList(!openList)}>
               <h4>{activRegion.name}</h4>
               <DownIcon />

               <div
                  className="parent_listRegion"
                  style={{
                     transform: `rotateX(${openList ? '0deg' : '90deg'})`,
                     transformOrigin: 'top',
                  }}>
                  <p
                     className="searchOll"
                     onClick={() => filter({ name: t(`RegionsMussseum`), region: null })}
                     style={{
                        backgroundColor: `${activRegion.region === null ? '#F6F5F5' : ''}`,
                     }}>
                     <LocationIcon width={15} height={15} fill={'#3F3D56'} />
                     {t(`allMussseum`)}
                  </p>
                  <div className="listRegion">
                     {regions.map((el, idx) => (
                        <div
                           key={idx}
                           className="listRegion_p"
                           style={{
                              backgroundColor: `${activRegion.region === el ? '#F6F5F5' : ''}`,
                           }}>
                           <p onClick={() => filter({ name: t(`${el}`), region: el })}>
                              <LocationIcon width={15} height={15} fill={'#3F3D56'} />
                              {t(`${el}`)}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(SearchBlockMuseumPage);
