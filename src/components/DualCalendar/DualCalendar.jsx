import React from 'react';
import './DualCalendar.css';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function DualCalendar() {
  const handleDateChange = (dates) => {
    console.log('Start Date:', dates[0].format('YYYY-MM-DD'));
    console.log('End Date:', dates[1].format('YYYY-MM-DD'));
  };

  return (
    <div>
      <RangePicker onChange={handleDateChange} />
    </div>
  );
}

export default DualCalendar;
