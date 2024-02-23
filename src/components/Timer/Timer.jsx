import React, { useState, useEffect } from 'react';
import './Timer.css'
import { useDispatch } from 'react-redux';
import { postRepeatVerifyCode } from '../../store/slices/RepeatVerifyCodeSlice/RepeatVerifyCodeApi';

const Timer = ({email}) => {
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [timerFinished, setTimerFinished] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      setTimerFinished(true);
    }
  }, [timeRemaining]);

  const handleRestartTimer = () => {
    if (timerFinished) {
        setTimeRemaining(5);
    setTimerFinished(false);
        dispatch(postRepeatVerifyCode({email: email.current.value}))
    }
  };

  return (
    <div>
      <div id="timer">{timerFinished ? `Ստացեք նոր կոդ` : `Ստացեք նոր կոդ ${timeRemaining} վայրկյանի ընթացքում`}</div>
      <div className='repeat_code'>
        <span>Եթե կոդը չեք ստացել</span>
        <span style={{color: timerFinished ?  'var(--second_font_color)' : 'gray'}} onClick={handleRestartTimer}>Կրկին ուղարկել</span>
      </div>
    </div>
  );
};

export default Timer;
