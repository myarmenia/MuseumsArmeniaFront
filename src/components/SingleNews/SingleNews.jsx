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
        <div style={{ display: 'flex', justifyContent: 'center' }}>loading...</div>
      ) : (
        <div className="container">
          <div className="single-news">
            <img
              src={SingleNewsDate.image}
              alt={SingleNewsDate.title}
              className="image-single-news"
            />
            <p className="single-news-created_at">{SingleNewsDate.created_at}</p>
            <h2 className="single-news-title">{SingleNewsDate.title}</h2>
            <p className="single-news-description">{SingleNewsDate.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleNews;
