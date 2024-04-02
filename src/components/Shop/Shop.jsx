import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Shop.css';
import SearchIcon from '../../images/search-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllShop,
  getCategoryShop,
  getFilteredShop,
  getMuseumNames,
  getSearchesShop,
  postShopCardData,
} from '../../store/slices/Shop/ShopApi';
import {
  getAllShopDate,
  getBaskettotalPrice,
  getCategories,
  getLoadingShop,
  getMuseumsNames,
  getSearchLengthShop,
  getSetModalIsOpenShop,
  setBasketData,
  setModalIsOpenShop,
  totalPriceBasket,
} from '../../store/slices/Shop/ShopSlice';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import CardModal from './CardModal';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';

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
  const IsAuth = useSelector(getIsAuth);
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);
  // const SearchLengthShop = useSelector(getSearchLengthShop);
  const [isPagination, setIsPagination] = useState(true);
  const [isFiltered, setIsFiltered] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMuseum, setSelectedMuseum] = useState('');
  const [errorText, setErrorText] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  // const [idd, setIddd] = useState(null);
  // const [imagee, setImagee] = useState(null);
  console.log('skizb');
  // const handleChangeCategory = (event) => {
  // debugger
  const handleChangeCategory = useCallback((event) => {
    const paginateDataObj = {
      currentPage: 1,
      searchText: '',
      museum_id: selectedMuseum,
      categora_id: event.target.value,
    };
    dispatch(
      getAllShop(paginateDataObj),
      // getFilteredShop({ category: event.target.value, museum: selectedMuseum })
    );
    setSelectedCategory(event.target.value);
    // AllShopData.data.length < 12 && setIsFiltered(false);
  }, []);
  // };
  console.log('vrevner');
  // const handleChangeMuseum = (event) => {
  const handleChangeMuseum = useCallback((event) => {
    const paginateDataObj = {
      currentPage: 1,
      searchText: '',
      museum_id: event.target.value,
      categora_id: selectedCategory,
    };
    setCurrentPage(0);

    dispatch(
      getAllShop(paginateDataObj),
      // getFilteredShop({ category: selectedCategory, museum: event.target.value, currentPage: 1 }),
    );
    setSelectedMuseum(event.target.value);
    // AllShopData.data.length < 12 && setIsFiltered(false);
  }, []);
  // };

  useEffect(() => {
    window.scrollTo(0, 250);
    console.log('useFfecti masss');
    dispatch(getCategoryShop()).then(() => {
      dispatch(getMuseumNames());
    });
    const paginateDataObj = {
      currentPage: 1,
      searchText: '',
      museum_id: '',
      categora_id: '',
    };
    dispatch(getAllShop(paginateDataObj));

    // dispatch(totalPriceBasket())
  }, []);
  console.log('useFfectic heto');

  // const sendShopPage = (data) => {
  const sendShopPage = useCallback((data) => {
    window.scrollTo(0, 300);
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    const paginateDataObj = {
      museum_id: selectedMuseum,
      categora_id: selectedCategory,
      currentPage: currentPage,
      searchText: searchTextShopRef.current.value,
    };

    dispatch(getAllShop(paginateDataObj));
  }, []);
  // };

  let SearchProductLength = AllShopData.data?.length;
  console.log('mejtexner');

  // const searchShop = (e) => {
  const searchShop = useCallback((e) => {
    e.preventDefault();
    SearchProductLength < 12 && setIsPagination(false);
    const paginateDataObj = {
      museum_id: selectedMuseum,
      categora_id: selectedCategory,
      currentPage: 1,
      searchText: searchTextShopRef.current.value,
    };

    dispatch(getAllShop(paginateDataObj));
    // dispatch(getSearchesShop(searchTextShopRef.current.value));
    // searchTextShopRef.current.value = '';
  }, []);
  // };

  const handleClickOpenModal = useCallback((id, image, name, price, museumName) => {
    return (e) => {
      e.stopPropagation();
      console.log('IsAuth', IsAuth);
      if (IsAuth) {
        dispatch(setModalIsOpenShop(true));
        dispatch(postShopCardData({ id }));
      } else {
        // setErrorText(true);
        // window.location.href()
        window.location.pathname = `/${leng}/login`
      }

      // dispatch(
      //   setBasketData({ id: id, image: image, name: name, price: price, museumName: museumName }),
      // );
      // Check if CardArray already exists in localStorage
      // let CardArray = JSON.parse(localStorage.getItem('CardArray'));

      // if (!CardArray) {
      //   // If CardArray doesn't exist, initialize it as an array with the current id
      //   CardArray = [{ id, image, name, price, museumName }];
      //   localStorage.setItem('CardArray', JSON.stringify(CardArray));
      //   dispatch(
      //     setBasketData({ id: id, image: image, name: name, price: price, museumName: museumName }),
      //   );
      //   console.log(CardArray.length, 'CardArra22222222222222222y');
      // } else {
      //   // If CardArray already exists, push the new id into it
      //   if (CardArray.find((el) => el.id === id)) {
      //   } else {
      //     console.log(CardArray.length, 'CardArrayCardArrayCardArray');
      //     CardArray.push({ id, image, name, price, museumName });
      //     localStorage.setItem('CardArray', JSON.stringify(CardArray));
      //     dispatch(
      //       setBasketData({
      //         id: id,
      //         image: image,
      //         name: name,
      //         price: price,
      //         museumName: museumName,
      //       }),
      //     );
      //   }
      // }
    };
  }, []);
  // console.log('AllShopData', AllShopData);
  // console.log('AllShopData_searchhh_bottom', AllShopData);
  // console.log('allCategories', allCategories);
  // console.log('allmuseumNames', allmuseumNames);
  console.log('minchev return');
  return (
    <>
      {console.log('jsxxxxxx')}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
          loading...
        </div>
      ) : (
        <div className="shop_all">
          {/* <div className={errorText ? 'shop_error_text' : 'shop_error_text_none'}>
            zambyuxic ogtvelu hamar petq e grancvel{' '}
          </div> */}
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
                    <option value="" key="">
                      bolor kategoria
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
                    <option value="" key="">
                      bolor tangaranner
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
              {AllShopData && AllShopData.data?.length !== 0
                ? AllShopData.data?.map((el, index) => (
                    <div
                      className="shop-box"
                      key={index}
                      onClick={() => navigate(`/${leng}/store/${el.id}`)}>
                      <div className="shop-box_img">
                        <img src={el.image} alt={el.image} />
                        <div className="souvenir_item_add_cart_div">
                          <ButtonSecond
                            txt="3"
                            onClick={handleClickOpenModal(
                              el.id,
                              el.image,
                              el.name,
                              el.price,
                              el.museum_name,
                            )}
                          />
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
                AllShopData.data?.length !== 0 &&
                AllShopData.meta?.per_page < AllShopData.meta?.total
                  ? 'shop-paginate'
                  : 'shop-paginate-none'
              }>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                forcePage={AllShopData.meta?.current_page - 1}
                pageCount={AllShopData.meta?.last_page !== null ? AllShopData.meta?.last_page : ''}
                marginPagesDisplayed={3}
                // onPageChange={(selected) => sendShopPage(selected.selected)}
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
          <CardModal />
        </div>
      )}
    </>
  );
}

export default Shop;
