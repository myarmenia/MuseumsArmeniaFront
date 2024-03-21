import React, { useEffect, useState } from 'react'
import { ticketsType } from '../../data/data'
import './PrivateTicket.css'
import { useDispatch } from 'react-redux'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import PrivateStandartAndAbonementTicket from '../PrivateStandartAndAbonementTicket/PrivateStandartAndAbonementTicket'
import PrivateUnitedTicket from '../PrivateUnitedTicket/PrivateUnitedTicket'
import PrivateEventTicket from '../PrivateEventTicket/PrivateEventTicket'

function PrivateTicket() {
    const [changeTicketType, setChangeTicketType] = useState('1')
    const dispatch = useDispatch()
    const handleChangeTicket = (item_id, type) =>{
        setChangeTicketType(item_id)
        dispatch(getPrivateTicket(type))
    }

    useEffect(()=> {
        dispatch(getPrivateTicket('standart'))
    },[])


  return (
    <div className='private_ticket'>
        <div className='container'>
            <div className='private_ticket_type_div'>
                {
                    ticketsType.map(item => 
                        <button key={item.id} style={{color: changeTicketType === item.id ? 'var(--second_font_color' : 'black'}} onClick={() => handleChangeTicket(item.id, item.type)}>{item.type}</button>
                    )
                }
            </div>

                {changeTicketType === '1' || changeTicketType === '2' ? <PrivateStandartAndAbonementTicket changeTicketType={changeTicketType}/> : ''}
                {changeTicketType === '3' && <PrivateUnitedTicket/>}
                {changeTicketType === '4' && <PrivateEventTicket/>}
        </div>
    </div>
  )
}

export default PrivateTicket