import React, { useEffect } from 'react';
import { home_page_news_section_data } from '../../data/data';
import './NewsSectionInHome.css';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatePages } from '../../store/slices/newses/NewsesApi';
import { getDataAllNewses } from '../../store/slices/newses/NewsesSlice';
import { useNavigate } from 'react-router-dom';

function NewsSectionInHome() {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DataAllNews = useSelector(getDataAllNewses);
  const DataAllNewsSlice = DataAllNews.slice(0, 3);

  useEffect(() => {
    dispatch(getPaginatePages());
  }, []);

  return (
    <div className="news_section_in_home">
      <div className="container">
        <h2 className="news_section_in_home_title">{t('news_section_title')}</h2>

        <div className="news_section_in_home_block">
          {/* <div className="news_section_in_home_items">
            {home_page_news_section_data.map((item) => (
              <div key={item.id} className="news_section_in_home_item">
                <div className="news_section_in_home_item_img_div">
                  <img src={item.img} alt ="news" />
                </div>

                <div className="news_section_in_home_item_info_div">
                  <span className="news_section_in_home_item_info_div_date">{item.date}</span>
                  <p>{item.txt}</p>
                </div>
              </div>
            ))}
          </div> */}

          <div className="newsess_home_page">
            {DataAllNews.length !== 0
              ? DataAllNews.slice(0, 3).map((el, index) => (
                  <div
                    className="news_box_home_page"
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

          <ButtonSecond txt="1" path={"news"} />
        </div>
      </div>
    </div>
  );
}

export default NewsSectionInHome;
