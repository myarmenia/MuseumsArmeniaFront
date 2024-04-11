import React from 'react'
import { left_event_line, locationEventIcon, locationIcon, right_event_line } from '../../iconFolder/icon'
import './EventsInHomeItem.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function EventsInHomeItem({ el }) {
    const { t, i18n } = useTranslation()
    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })
    const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
    const navigate = useNavigate()
   

    return (
        <div className='events_in_home_item'>
            <div className='events_in_home_item_img_div'>
                <img src={el.image} alt="event" />
            </div>

            <div className='events_in_home_item_info'>
                <div className='events_in_home_item_info_block'>
                    <div className='events_in_home_item_info_block_txt_div'>
                        <div className='events_in_home_item_info_block_txt_div_date_and_price'>
                            <span>{el.full_date}</span>
                            <span>{el.price} AMD</span>
                        </div>

                        <div className='events_in_home_item_info_block_txt_div_info_div'>
                            <p>{el.name}</p>
                            <span>{el.description}</span>
                            <p>{el.museum_name}</p>
                            <div className='event_location_div'>
                                <span >{locationEventIcon}</span>
                                {
                                     privateTicketRegions.map((item, index) => Object.keys(item)[0] === el.region ? <span key={index}> {Object.values(item)[0]}</span> : '')
                                }
                            </div>
                        </div>
                    </div>

                    <button className='event_inHome_btn' onClick={() => navigate(`/${leng}/events/${el.id}`)}>{t('buttons.9')}</button>
                </div>

                {el.id % 2 === 0 &&<div className='line_div_event_left'>{right_event_line}</div>}
                {el.id % 2 !== 0 &&<div className='line_div_event_right'>{left_event_line}</div>}
            </div>
        </div>
    )
}

export default EventsInHomeItem