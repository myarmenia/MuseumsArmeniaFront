import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomSearshBlock } from '../../index';
import { getMuseumOneProducts } from '../../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import ProductsBlock from './ProductsBlock';
import LoadSpinner from '../../../LoadSpinner/LoadSpinner';
import CustopPagination from '../../CustopPagination';

import './museumOneShop.css';
const MuseumOneShop = ({ museumId }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();
   const [activCategoru, setActivCategoru] = React.useState({
      name: t(`selectCategory`),
      type: null,
      id: null,
   });

   const { dataMuseumProducts, loadingMuseumProducts } = useSelector((state) => state.museumPages);

   const filter = React.useCallback((obj) => {
      setActivCategoru(obj);
      dispatch(getMuseumOneProducts({ museumId: museumId, productId: obj.id }));
   }, []);
   // console.log(dataMuseumProducts, 222222222);
   return (
      <div className="museumOne_pageStyle">
         {loadingMuseumProducts === 'fulfilled' ? (
            <div className="MuseumOneShop-par">
               <div className="MuseumOneShop-parHeader">
                  <div>
                     <h4 className="museumOne_title">{t(`thisMuseum`)}</h4>
                     <p>Showing 1-12 of 15 results</p>
                  </div>
                  <CustomSearshBlock
                     arr={dataMuseumProducts.products_category}
                     activ={activCategoru}
                     fun={filter}
                     translationtxt={['selectCategory', 'allMussseum']}
                  />
               </div>
               {dataMuseumProducts.dataProducts.length > 0 ? (
                  <>
                     <div className="MuseumOneShop-parProducts">
                        {dataMuseumProducts.dataProducts.map((item) => (
                           <ProductsBlock {...item} key={item.id} />
                        ))}
                     </div>
                     {dataMuseumProducts.dataProducts.length > 7 && (
                        <div className="MuseumOneShop-pagination">
                           <CustopPagination allpageCount={dataMuseumProducts.pageCount} />
                        </div>
                     )}
                  </>
               ) : (
                  <div className="productsErrorMessages">
                     <p>{t(`productsErrorMessages`)}</p>
                  </div>
               )}
            </div>
         ) : loadingMuseumProducts === 'loading' ? (
            <LoadSpinner />
         ) : (
            ''
         )}
      </div>
   );
};

export default MuseumOneShop;
