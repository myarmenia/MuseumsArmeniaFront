import React, { useEffect } from 'react';
import './ChatProfile.css';
import send from '../../../images/send.png';
import { useDispatch, useSelector } from 'react-redux';
import { getChatProfileData } from '../../../store/slices/ChatProfile/ChatProfileApi';
import { getChatProfileDates } from '../../../store/slices/ChatProfile/ChatProfileSlice';

function ChatProfile() {
  const dispatch = useDispatch();
  const chatProfileDates = useSelector(getChatProfileDates);

  useEffect(() => {
    dispatch(getChatProfileData());
  }, []);
  // console.log("chatProfileDates",chatProfileDates);
  return (
    <>
      <div className="chat_all">
        <div className="chat_left">
          {chatProfileDates.map((el, index) => (
            <div className="chat_user" key={index}>
              <div>
                <p>{el.museum_name}</p>
              </div>
              <div className="chat_user_count">1</div>
            </div>
          ))}
        </div>
        <div className="chat_right">
          <div className="chat_right_content">
            <div className="chat_right_content_messages">56555aaaaaa</div>
          </div>
          <div className="chat_right_typeing">
            <textarea cols="30" placeholder="Write a messge"></textarea>
            <img src={send} alt="send" />
            {/* <p>Write a messge</p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatProfile;
