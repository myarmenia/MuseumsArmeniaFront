import React from 'react';
import { single_teecket_data } from '../../data/data';
import './SingleTicketSection.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

function SingleTicketSection() {
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const navigate = useNavigate();
  return (
    <div className="single_tecket">
      {single_teecket_data.map((item, index) => (
        <div
          key={index}
          className="single_tecket_item"
          style={{ backgroundImage: `url(${item.img})` }}>
          <div className="darck_fon">
            <div className="container">
              <h2>{item.title}</h2>
              <p>{item.txt}</p>
              <Button txt="0" onClick={() => navigate(`/${leng}/comboticket`)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SingleTicketSection;
