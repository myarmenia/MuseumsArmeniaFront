import React, { useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteMuseumMessages } from '../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import TypeList from './TypeList';
import MessagesModal from './MessagesModal';
import MessagesBlock from './MessagesBlock';

import './newMesages.css';

const MuseumPageMessages = ({museumId}) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();
   const { loadingStatus, dataMuseumOne } = useSelector((state) => state.museumPages);
   const { isAuth, authUser } = useSelector((store) => store.auth);
   const { messagesType, dataMuseumMessages } = useSelector((store) => store.messages);

   const { name } = dataMuseumOne;


   const onClickButton =()=> {
   
   }

   return (
      <MessagesModal>
         <div>
            <div className="MessagesModal-header">
               <div
                  style={{
                     width: '100%',
                     height: '100px',
                     backgroundSize: 'contain',
                     backgroundRepeat: 'round',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     borderBottom: '1px solid #cea670',
                     marginBottom: '10px',
                     position: 'relative',
                  }}>
                  <h4>{name}</h4>
               </div>
            </div>
            <div className="MessagesModal-section">
               <div>
                  {isAuth && dataMuseumMessages.length ? (
                     <div>
                        <h3>cankanum eq sharunakel haxordagrutyun@</h3>
                        <button onClick={()=>onClickButton}>ayo</button>
                        <button onClick={()=>onClickButton}>voch</button>
                     </div>
                  ) : (
                     'kjkjkj'
                  )}
               </div>
               <MessagesBlock authUser={authUser} isAuth={isAuth} />
            </div>
         </div>
      </MessagesModal>
   );
};

export default memo(MuseumPageMessages);
