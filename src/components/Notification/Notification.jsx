import React, { useEffect } from 'react'
import './Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification } from '../../store/slices/ProfilePageSlice/ProfilePageApi'
import { selectNotification } from '../../store/slices/ProfilePageSlice/ProfilePageSlice'
import { rightArowIcon } from '../../iconFolder/icon'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Notification() {
    const {t, i18n} = useTranslation()
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
            <h3 className='notification_page_title'>{t('profil_side_bar.4')}</h3>
            {respNotification?.length > 0 ? (<div className='notification_page_items'>
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
            </div>) : (<h3 style={{fontWeight: '100'}}>{t('single_shop_page.3')}</h3>)}
        </div>
    </div>
  )
}

export default Notification