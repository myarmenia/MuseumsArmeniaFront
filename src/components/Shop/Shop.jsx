import React, { useEffect, useRef, useState } from 'react';
import './Shop.css';
import SearchIcon from '../../images/search-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllShop,
  getCategoryShop,
  getFilteredShop,
  getMuseumNames,
  getSearchesShop,
} from '../../store/slices/Shop/ShopApi';
import {
  getAllShopDate,
  getCategories,
  getLoadingShop,
  getMuseumsNames,
} from '../../store/slices/Shop/ShopSlice';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonSecond from '../ButtonSecond/ButtonSecond';

function Shop() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const dispatch = useDispatch();
  const searchTextShopRef = useRef(null);
  const AllShopData = useSelector(getAllShopDate);
  const loading = useSelector(getLoadingShop);
  const allCategories = useSelector(getCategories);
  const allmuseumNames = useSelector(getMuseumsNames);
  const [isPagination, setIsPagination] = useState(true);
  const [isFiltered, setIsFiltered] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMuseum, setSelectedMuseum] = useState('');

  const handleChangeCategory = (event) => {
    console.log(event.target.value);
    dispatch(getFilteredShop({ category: event.target.value, museum: selectedMuseum }));
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setIsFiltered(false);
  };

  const handleChangeMuseum = (event) => {
    // console.log(event.target.value);
    dispatch(getFilteredShop({ category: selectedCategory, museum: event.target.value }));
    const selectedValueM = event.target.value;
    setSelectedMuseum(selectedValueM);
    setIsFiltered(false);
  };

  useEffect(() => {
    dispatch(getAllShop());
    dispatch(getCategoryShop());
    dispatch(getMuseumNames());
  }, []);

  const sendShopPage = (data) => {
    window.scrollTo(0, 300);
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    dispatch(getAllShop(currentPage));
  };

  const searchShop = (e) => {
    e.preventDefault();
    dispatch(getSearchesShop(searchTextShopRef.current.value));
    searchTextShopRef.current.value = '';
    setIsPagination(false);
  };

  console.log('AllShopData', AllShopData);
  // console.log('allCategories', allCategories);
  // console.log('allmuseumNames', allmuseumNames);
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
          loading...
        </div>
      ) : (
        <div className="shop_all">
          <div className="backImage_shop">
            <h1>{t('shop_page_data.0')}</h1>
          </div>
          <div className="container">
            <div className="input_and_filteres">
              <form className="form_shop" onSubmit={(e) => searchShop(e)}>
                <div className="input-container-shop">
                  <input type="text" ref={searchTextShopRef} className="input-search-searchIcon" />
                  <button type="submit" className="input-search-shop-button">
                    <img src={SearchIcon} alt="pencleEdit" className="input-search-shop-img" />
                  </button>
                </div>
              </form>

              <div className="fileress">
                <div className="custom-select-container">
                  <select
                    className="custom-select"
                    onChange={handleChangeCategory}
                    value={selectedCategory}>
                    <option value="" disabled hidden>
                    {t('shop_page_data.1')}
                    </option>
                    {allCategories.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.key}
                      </option>
                    ))}
                  </select>
                </div>

                {/* //// */}
                <div className="custom-select-container">
                  <select
                    className="custom-select"
                    onChange={handleChangeMuseum}
                    value={selectedMuseum}>
                    <option value="" disabled hidden>
                    {t('shop_page_data.2')}
                    </option>
                    {allmuseumNames.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div
              className={
                AllShopData.data?.length === 0 || AllShopData.data?.length > 2
                  ? 'shopess'
                  : 'shopess_start'
              }>
              {AllShopData.data?.length !== 0
                ? AllShopData?.data.map((el, index) => (
                    <div
                      className="shop-box"
                      key={index}
                      onClick={() => navigate(`/${leng}/store/${el.id}`)}>
                      <div className="shop-box_img">
                        <img src={el.image} alt={el.image} />
                        <div className="souvenir_item_add_cart_div">
                            <ButtonSecond txt="3" />
                          </div>
                      </div>
                      <div className="shop-box_texts_div">
                        <p className="shop-box-title">
                          {el.name?.length > 45 ? el.name.slice(0, 45) + '...' : el.name}
                        </p>
                        <p className="shop-box-price">{el.price}</p>
                      </div>
                    </div>
                  ))
                : t('shop_page_data.3')}
            </div>
            <div
              className={
                AllShopData.data.length !== 0 && isPagination && isFiltered
                  ? 'shop-paginate'
                  : 'shop-paginate-none'
              }>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={AllShopData.meta.last_page !== null ? AllShopData.meta.last_page : ''}
                marginPagesDisplayed={3}
                onPageChange={sendShopPage}
                containerClassName={'paginationn'}
                pageClassName={'page-items'}
                pageLinkClassName={'page-link'}
                previousClassName={'prev-item'}
                nextClassName={'next-item'}
                breakClassName={'break-item'}
                activeClassName={'active-itemm'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Shop;
