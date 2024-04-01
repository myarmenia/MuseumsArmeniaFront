import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const dataTypeMessages = ['educational_program', 'excursion', 'other'];

const UserChatList = ({ messagesUser, dataMuseumMessages }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();

   const { dataMuseumOne } = useSelector((store) => store.museumPages);

   const divRef = useRef();
  
   useEffect(() => {
      const div = divRef.current;
      div.scrollTop = div.scrollHeight;
   }, [dataMuseumMessages]);

   return (
      <div ref={divRef} className="par_type" style={{height: '480px'}}>
         {/* <div className="par-avatar_bot">
            <div
               className="avatar_bot"
               style={{ background: `url(${dataMuseumOne.main_photo})` }}></div>
            <p>{dataMuseumOne.name}</p>
         </div> */}
         <div className="chatList-bot">
            <ul className="chatList-ul">
               {dataMuseumMessages.messages.map((el) => (
                  <li  key={el.id} className={el.type === 'visitor' ? 'user_messages' : 'admin_messages'}>
                     <span style={{ cursor: 'inherit' }} >
                        {el.text}
                     </span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default UserChatList;
