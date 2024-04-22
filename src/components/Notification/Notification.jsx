import React, { useEffect } from 'react'
import './Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification } from '../../store/slices/ProfilePageSlice/ProfilePageApi'
import { selectNotification } from '../../store/slices/ProfilePageSlice/ProfilePageSlice'
import { rightArowIcon } from '../../iconFolder/icon'
import { useNavigate } from 'react-router-dom'

function Notification() {
   const dispatch = useDispatch()
   const respNotification = useSelector(selectNotification)
   const navigate = useNavigate()
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';

    useEffect(()=> {
        dispatch(getNotification())        
    },[])
  return (
    <div className='notification_page'>
        <div className='container'>
            <h3 className='notification_page_title'>Notification</h3>
            <div className='notification_page_items'>
                {
                    respNotification && respNotification.map(not => (
                        <div key={not.id} className='notification_page_item' onClick={() => navigate(`/${leng}/events/${not.event_id}`)}>
                            <div className='notification_page_item_img_div'>
                                <img src={not.image.path} alt={not.event_name} />
                                <span>{not.event_name}</span>
                            </div>
                            <span>{rightArowIcon}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Notification