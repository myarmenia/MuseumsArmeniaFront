import React, {useCallback, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setMessagesType } from '../../store/slices/MessagesBotSlice/MessagesBotSlice';

const dataTypeMessages = ['educational_program', 'excursion', 'other'];

const MessagesBotBlock = () => {
   const { t, i18n } = useTranslation();
   const  [messagesType, setmessagesType]  = useState(null);
   const dispatch = useDispatch();

   const {dataEducationalPrograms, dataMuseumOne} = useSelector(store => store.museumPages)
   // const {messagesType} = useSelector(store => store.messagesBot)
   
   console.log(dataEducationalPrograms, 888888);
   
   const onClickItem = useCallback((item) => {
      // dispatch(setMessagesType(item));
      setmessagesType(item)
      
   }, []);
   return (
      <div>
         <div className="par_type">
            <div className="par-avatar_bot">
               <div className="avatar_bot" style={{background: `url(${dataMuseumOne.main_photo})`}}></div>
               <p>{dataMuseumOne.name}</p>
            </div>
            <div className="chatList-bot">
               <ul className="chatList-ul">
                  <li><span style={{cursor: 'inherit'}} className="chatList-li">{t(`typeMessages`)}</span></li>
                  {
                     dataTypeMessages.map((item, idx) => <li 
                     className="admin_messages"
                        onClick={()=> onClickItem(item)} 
                        key={idx} 
                        style={{
                           display : (item === 'educational_program' && !dataEducationalPrograms.length)  ? 'none' : ''
                        }}
                        >
                     <span className="chatList-li">{idx+1}.{t(`${item}`)}</span>
                  </li>)
                  }
                  {
                     messagesType && <li className="user_messages"><span className="chatList-li">{t(`${messagesType}`)}</span></li>
                  }

                  {
                     messagesType === 'educational_program' ? dataEducationalPrograms.map((el, idx) => <li key={el.id} className="admin_messages"><span className="chatList-li">{idx+1}.{el.name}</span></li>) : ''
                  }
               </ul>
            </div>
         </div>
      </div>
   );
};

export default MessagesBotBlock;
