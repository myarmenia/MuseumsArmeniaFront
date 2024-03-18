import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
   setMessagesType,
   setEducationProgramType,
} from '../../store/slices/MessagesBotSlice/MessagesBotSlice';

const dataTypeMessages = ['educational_program', 'excursion', 'other'];

const MessagesBotBlock = ({ messagesUser }) => {
   const { t, i18n } = useTranslation();
   // const [messagesType, setmessagesType] = useState(null);
   // const [education_program_type, setEducationProgramType] = useState(null);
   const dispatch = useDispatch();

   const { dataEducationalPrograms, dataMuseumOne } = useSelector((store) => store.museumPages);
   const { messagesType, educationProgramType } = useSelector((store) => store.messagesBot);

   const onClickMessagesType = useCallback((item) => {
      dispatch(setMessagesType(item));
      dispatch(setEducationProgramType(null));
      // setmessagesType(item);
   }, []);
   const onClickEducationProgramType = useCallback((item) => {
      dispatch(setEducationProgramType(item));
      // setEducationProgramType(item);
   }, []);

   const divRef = useRef();

   useEffect(() => {
      const div = divRef.current;
      div.scrollTop = div.scrollHeight;
   }, [messagesType, educationProgramType, messagesUser]);

   return (
      <>
         <div ref={divRef} className="par_type">
            <div className="par-avatar_bot">
               <div
                  className="avatar_bot"
                  style={{ background: `url(${dataMuseumOne.main_photo})` }}></div>
               <p>{dataMuseumOne.name}</p>
            </div>
            <div className="chatList-bot">
               <ul className="chatList-ul">
                  <li>
                     <span style={{ cursor: 'inherit' }} className="chatList-li">
                        {t(`typeMessages`)}
                     </span>
                  </li>
                  {dataTypeMessages.map((item, idx) => (
                     <li
                        className="admin_messages"
                        onClick={() => onClickMessagesType(item)}
                        key={idx}
                        style={{
                           display:
                              item === 'educational_program' && !dataEducationalPrograms.length
                                 ? 'none'
                                 : '',
                        }}>
                        <span className="chatList-li">
                           {idx + 1}.{t(`${item}`)}
                        </span>
                     </li>
                  ))}
                  {messagesType && (
                     <li className="user_messages">
                        <span className="chatList-li">{t(`${messagesType}`)}</span>
                     </li>
                  )}

                  {messagesType === 'educational_program'
                     ? dataEducationalPrograms.map((el, idx) => (
                          <li
                             key={el.id}
                             className="admin_messages"
                             onClick={() => onClickEducationProgramType(el.name)}>
                             <span className="chatList-li">
                                {idx + 1}.{el.name}
                             </span>
                          </li>
                       ))
                     : ''}
                  {educationProgramType && (
                     <li className="user_messages">
                        <span className="chatList-li">{educationProgramType}</span>
                     </li>
                  )}
                  {dataEducationalPrograms.length && messagesType === 'educational_program'
                     ? messagesType &&
                       educationProgramType && (
                          <li className="admin_messages">
                             <ul className="chatBotHint_list">
                                <li>{t(`chatBotHint.0`)}</li>
                                <li>1.{t(`chatBotHint.1`)}</li>
                                <li>2.{t(`chatBotHint.2`)}</li>
                                <li>3.{t(`chatBotHint.3`)}</li>
                                <li>4.{t(`chatBotHint.4`)}</li>
                                <li>5.{t(`chatBotHint.5`)}</li>
                             </ul>
                          </li>
                       )
                     : messagesType && (
                          <li className="admin_messages">
                             <ul className="chatBotHint_list">
                                <li>{t(`chatBotHint.0`)}</li>
                                <li>1.{t(`chatBotHint.1`)}</li>
                                <li>2.{t(`chatBotHint.2`)}</li>
                                <li>3.{t(`chatBotHint.3`)}</li>
                                <li>4.{t(`chatBotHint.4`)}</li>
                                <li>5.{t(`chatBotHint.5`)}</li>
                             </ul>
                          </li>
                       )}

                  {messagesUser && (
                     <li className="user_messages">
                        <span className="chatList-li">{messagesUser}</span>
                     </li>
                  )}
               </ul>
            </div>
         </div>
      </>
   );
};

export default MessagesBotBlock;
