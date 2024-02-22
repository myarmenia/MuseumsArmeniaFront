import React from 'react'
import { single_teecket_data } from '../../data/data'
import './SingleTicketSection.css'
import Button from '../Button/Button'

function SingleTicketSection() {
  return (
    <div className='single_tecket'>
            {
                single_teecket_data.map((item, index)=> 
                    <div key={index} className='single_tecket_item' style={{backgroundImage: `url(${item.img})`}}>
                        <div className='darck_fon'>
                            <div className='container'>
                                <h2>{item.title}</h2>
                                <p>{item.txt}</p>
                                <Button txt='0'/>
                            </div>
                        </div>
                    </div>
                )
            }

    </div>
  )
}

export default SingleTicketSection