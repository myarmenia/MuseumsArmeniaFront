import React from 'react'
import { home_page_news_section_data } from '../../data/data'
import './NewsSectionInHome.css'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useTranslation } from 'react-i18next'

function NewsSectionInHome() {
    const {t, i18n} = useTranslation()
  return (
    <div className='news_section_in_home'>
        <div className='container'>
            <h2 className='news_section_in_home_title'>{t('news_section_title')}</h2>

            <div className='news_section_in_home_block'>
                <div className='news_section_in_home_items'>
                {
                    home_page_news_section_data.map(item => 
                        <div key={item.id} className='news_section_in_home_item'>
                            <div className='news_section_in_home_item_img_div'>
                                <img src={item.img} alt="news" />
                            </div>

                            <div className='news_section_in_home_item_info_div'>
                                <span className='news_section_in_home_item_info_div_date'>{item.date}</span>
                                <p>{item.txt}</p>
                            </div>
                        </div>
                    )
                }
            </div>

            <ButtonSecond txt='1'/>
            </div>
        </div>
    </div>
  )
}

export default NewsSectionInHome