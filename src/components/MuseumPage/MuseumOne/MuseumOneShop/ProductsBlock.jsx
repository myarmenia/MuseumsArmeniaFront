import React from 'react';
import { Link } from 'react-router-dom';
import { ShopMinIcons } from '../../../../iconFolder/icon';

const ProductsBlock = ({ id, image, product_category_id, price, name }) => {
   return (
      <div className="ProductsBlock">
         <div className="ProductsBlock-img">
            <img src={image} alt="images products" />
         </div>
         <div className="ProductsBlock-description">
            <p className="ProductsBlock-description-title">{name.slice(0, 30)}</p>
            <p className="ProductsBlock-description-categoru"></p>
            <div className="ProductsBlock-description-parPrice">
               <p className="ProductsBlock-description-price">{price}AMD</p>

               <ShopMinIcons />
            </div>
            <Link>
               <button className="ProductsBlock-description-btn">Buy </button>
            </Link>
         </div>
      </div>
   );
};

export default ProductsBlock;
