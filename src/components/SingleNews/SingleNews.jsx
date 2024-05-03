import React, { useEffect } from 'react';
import './SingleNews.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleNews } from '../../store/slices/newses/NewsesApi';
import { getLoadingNewses, getSingleNewsDate } from '../../store/slices/newses/NewsesSlice';
import { useParams } from 'react-router-dom';

function SingleNews() {
  const params = useParams();
  const dispatch = useDispatch();
  const SingleNewsDate = useSelector(getSingleNewsDate);
  const loading = useSelector(getLoadingNewses);

  useEffect(() => {
    dispatch(getSingleNews(params.id));
  }, []);

  console.log('SingleNewsDate', SingleNewsDate);

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
          loading...
        </div>
      ) : (
        <div className="SingleNews_all">
          <div className="shop_top_titels">
            <div className="lines_div">
              <img className="border_1" src={require('../../images/Line 106.png')} alt="" />
              <h2 style={{ textTransform: 'uppercase' }}>NEWS</h2>
              <img className="border_2" src={require('../../images/Line 106.png')} alt="" />
            </div>
            <p style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
              Armenian cultural news
            </p>
          </div>
          <div className="container">
            <div className="all_singleNews_contain">
              <div className="single-news">
                <h2 className="single-news-title">{SingleNewsDate.title}</h2>
                <div className="imag_and_date">
                  <img
                    src={SingleNewsDate.image}
                    alt={SingleNewsDate.title}
                    className="image-single-news"
                  />
                  <p className="single-news-created_at">{SingleNewsDate.created_at}</p>
                </div>

                <p className="single-news-description">{SingleNewsDate.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleNews;
