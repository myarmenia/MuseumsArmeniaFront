import React, { useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import TypeList from './TypeList';
import MessagesModal from './MessagesModal';
import MessagesBlock from './MessagesBlock';

import './newMesages.css';

const MuseumPageMessages = ({ modalIsOpen, setIsOpen }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();
   const { isAuth, authUser } = useSelector((store) => store.auth);
   const { messagesType } = useSelector((store) => store.messages);
   return (
      <MessagesModal>
         {messagesType ? <MessagesBlock authUser={authUser} isAuth={isAuth} />  : <TypeList />}
      </MessagesModal>
   );
};

export default memo(MuseumPageMessages);
