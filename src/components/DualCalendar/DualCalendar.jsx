import React from 'react';
import './DualCalendar.css';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi';
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice';

const { RangePicker } = DatePicker;

function DualCalendar({museum, setStartDate, setEndDate, startDate, endDate, museumItem, setEventLineCalendar}) {
  const respStandartTicket = useSelector(selectprivateTicket)

  const dispatch = useDispatch()
  const handleDateChange = (dates) => {

    if (dates && dates.length === 2) {
      sessionStorage.setItem('start_date', dates[0].format('YYYY-MM-DD'));
      sessionStorage.setItem('end_date', dates[1].format('YYYY-MM-DD'));
      setStartDate(dates[0].format('YYYY-MM-DD'));
      setEndDate(dates[1].format('YYYY-MM-DD'));
      const start_date = sessionStorage.getItem('start_date');
      const end_date = sessionStorage.getItem('end_date');
      dispatch(getPrivateTicket({type: 'event', startDate: start_date, endDate: end_date, museumId: museum !== '' ? museumItem?.id : null }));
    } else {
      
      console.error('Invalid dates:', dates);
    }

  };

  const handleCalendarClick = (e) =>{
    e.stopPropagation()
    setEventLineCalendar(false)
  }


  return (
    <div>
      <RangePicker onChange={handleDateChange}
      onClick={(e) => handleCalendarClick(e)}
      placeholder={['Start Date', 'End Date']}
       />
    </div>
  );
}

export default DualCalendar;
