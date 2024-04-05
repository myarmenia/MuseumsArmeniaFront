import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSearshBlock } from '../../index';
import './museumOneShop.css';
const MuseumOneShop = ({ dataMuseumProducts }) => {
   const { t, i18n } = useTranslation();
   console.log(dataMuseumProducts, 3333);

   const [activCategoru, setActivCategoru] = React.useState({
      name: t(`selectCategory`),
      type: null,
      id: null,
   });
   console.log(activCategoru, 1111);

   const filter = React.useCallback((obj) => {
      setActivCategoru(obj);

      // dispatch(filterRegionMuseum(obj));
   }, []);

   return (
      <div className="museumOne_pageStyle">
         <div className="MuseumOneShop-par">
            <div className="MuseumOneShop-parHeader">
               <div>
                  <h4 className="museumOne_title">Shop of this museum</h4>
                  <p>Showing 1-12 of 15 results</p>
               </div>
               <CustomSearshBlock
                  arr={dataMuseumProducts.products_category}
                  activ={activCategoru}
                  fun={filter}
                  translationtxt={['selectCategory', 'allMussseum']}
               />
            </div>
         </div>
      </div>
   );
};

export default MuseumOneShop;
