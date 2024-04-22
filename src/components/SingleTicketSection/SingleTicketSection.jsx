import React, { useEffect } from 'react';
import './SingleTicketSection.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi';
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice';

function SingleTicketSection() {
  const {t, i18n} = useTranslation()
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const respCount = useSelector(selectprivateTicket)
  useEffect(()=> {
    dispatch(getPrivateTicket({type: 'united', startDate: null, endDate: null, museumId: null }))
   
},[])

// console.log(respCount,'aaaa');

const single_teecket_data = {
  title: t('ticketsType.2'),
  txt: `${t('section_united_ticket.0')} ${respCount && respCount.params && respCount.params.min_museum_quantity ? respCount.params.min_museum_quantity : 'default value'} ${t('section_united_ticket.1')} ${respCount && respCount.params && respCount.params.discount_percent ? respCount.params.discount_percent : 'default value'} ${t('section_united_ticket.2')}`,
  img: require('../../images/teecket-back.png')
};
   
  
  return (
    <div className="single_tecket">
        <div
          className="single_tecket_item"
          style={{ backgroundImage: `url(${single_teecket_data.img})` }}>
          <div className="darck_fon">
            <div className="container">
              <h2>{single_teecket_data.title}</h2>
              <div className='line_div_darck_fon'>
                <img src={require('../../images/Line 108.png')} alt="" />
                <p>{single_teecket_data.txt}</p>
                <img src={require('../../images/Line 108.png')} alt="" />
              </div>
              <Button txt="0" onClick={() => navigate(`/${leng}/comboticket`)} />
            </div>
          </div>
        </div>
    </div>
  );
}

export default SingleTicketSection;
