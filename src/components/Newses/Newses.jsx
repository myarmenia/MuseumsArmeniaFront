import React, { useEffect, useRef, useState } from 'react';
import './Newses.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllNewses,
  getPaginatePages,
  getSearchesNewses,
} from '../../store/slices/newses/NewsesApi';
import {
  getDataAllNewses,
  getLoadingNewses,
  getPaginateLength,
} from '../../store/slices/newses/NewsesSlice';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';

function Newses() {
  const lang = localStorage.getItem('lang');
  const navigate = useNavigate();
  // const [sizes, setSizes] = useState(45);
  const textInputRef = useRef(null);
  const dispatch = useDispatch();
  const DataAllNews = useSelector(getDataAllNewses);
  const loading = useSelector(getLoadingNewses);
  const paginateLength = useSelector(getPaginateLength);
  const [newsSearch, setNewsSearch] = useState(false);

  useEffect(() => {
    // console.log(changeFonSize, 777777);
    // dispatch(getAllNewses());
    dispatch(getPaginatePages());
    // setSizes(changeFonSize === 'large' ? 45 : changeFonSize === 'medium' ? 30 : 20);
  }, []);

  const searchNews = (e) => {
    e.preventDefault();
    dispatch(getSearchesNewses(textInputRef.current.value));
    textInputRef.current.value = '';
    if (DataAllNews.length > 5) {
      console.log('aaaaaaaaaa');
      setNewsSearch(true);
    }
  };

  const handlePageClick = (data) => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    dispatch(getPaginatePages(currentPage));
  };

  console.log('DataAllNews', DataAllNews);
  console.log('loading', loading);
  // console.log('PaginateLength', paginateLength);

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>loading...</div>
      ) : (
        <div className="all_news">
          <div className="backImage">
            <h1
            // className="backImage_title"
            // style={{
            //   fontSize: `${sizes}px`,
            // }}
            >
              ՆՈՐՈՒԹՅՈՒՆՆԵՐ
            </h1>
          </div>
          <form onSubmit={(e) => searchNews(e)}>
            <input type="text" name="text" ref={textInputRef} className="form_input" />
            <button type="submit" className="form_button">
              Որոնել
            </button>
          </form>
          <div className="container">
            <div
              className={
                DataAllNews.length === 0 || DataAllNews.length > 4 ? 'newsess' : 'newsess_start'
              }>
              {DataAllNews.length !== 0
                ? DataAllNews.map((el, index) => (
                    <div
                      className="news_box"
                      key={index}
                      onClick={() => navigate(`/${lang}/news/${el.id}`)}>
                      <div className="news_box_image">
                        <img src={el.image} alt={el.title} />
                      </div>
                      <div className="news_box_title">
                        <span>{el.created_at}</span>
                        <p>{el.title.length > 58 ? el.title.slice(0, 58) + ' ...' : el.title}</p>
                      </div>
                    </div>
                  ))
                : 'Տվյալներ չեն գտնվել'}
            </div>
            <div
              className={
                DataAllNews.length !== 0 && !newsSearch ? 'pagination' : 'pagination_none'
              }>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={paginateLength !== null ? paginateLength : ''}
                marginPagesDisplayed={3}
                onPageChange={handlePageClick}
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

export default Newses;
