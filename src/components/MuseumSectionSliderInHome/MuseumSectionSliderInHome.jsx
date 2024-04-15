import React from 'react'
import { responsive, homePage_museum_section_data } from '../../data/data'
import "react-multi-carousel/lib/styles.css";
import './MuseumSectionSliderInHome.css'

import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';
import { locationIcon } from '../../iconFolder/icon';

function MuseumSectionSliderInHome() {

    const { t, i18n } = useTranslation()

    const product =
        homePage_museum_section_data.map(el => {

            return <div key={el.id} className='museum_section_item'>
                <div className='museum_section_item_img_div'>
                    <img src={el.img} alt="news" />
                </div>

                <div className='museum_section_item_info_div'>
                    <p>{el.name}</p>
                   <div>
                        <span>{locationIcon}</span>
                        <span className='museum_section_item_info_div_location'>{el.location}</span>
                   </div>
                </div>
            </div>
        }

        )


    return (
        <div className='slide-section'>


            <div className='container'>
                {/* <div className='slide_section_title'>
                    <h2>{t('museum_slide_title.0')}</h2>
                    <p>{t('museum_slide_title.1')}</p>
            </div> */}

                <div className='lines_div_section_museum'>
                    <img src={require('../../images/line_gold.png')} alt="line" />
                    <h2>{t('museum_slide_title.0')}</h2>
                    <img src={require('../../images/line_gold.png')} alt="line" />
                </div>
                <div className='slide-section-items'>
                    <Carousel showDots={true}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        containerClass='carousel-container'
                        dotListClass='custom-dot-list-style'
                        itemClass='carousel-item-padding-40-px'
                    >
                        {product}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default MuseumSectionSliderInHome

