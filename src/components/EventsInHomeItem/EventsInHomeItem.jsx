import React from 'react'
import { locationIcon } from '../../iconFolder/icon'
import './EventsInHomeItem.css'

function EventsInHomeItem({el}) {
  return (
    <div className='events_in_home_item'>
        <div className='events_in_home_item_img_div'>
            <img src={el.image} alt="event"/>
        </div>

        <div className='events_in_home_item_info'>
            <div className='events_in_home_item_info_block'>
                <div className='events_in_home_item_info_block_txt_div'>
                    <div className='events_in_home_item_info_block_txt_div_date_and_price'>
                        <span>{el.full_date}</span>
                        <span>{el.price}</span>
                    </div>

                    <div className='events_in_home_item_info_block_txt_div_info_div'>
                        <p>{el.name}</p>
                        <span>{el.description}</span>
                        <p>{el.museum_name}</p>
                        <div>
                            <span>{locationIcon}</span>
                            <span>{el.region}</span>
                        </div>
                    </div>
                </div>

                <button>Buy Ticket</button>
            </div>
        </div>
    </div>
  )
}

export default EventsInHomeItem