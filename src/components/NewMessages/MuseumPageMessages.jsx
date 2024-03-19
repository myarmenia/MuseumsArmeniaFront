import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import MessagesModal from './MessagesModal';
import MessagesBlock from './MessagesBlock';
import NotUserMessagesBlock from './NotUserMessagesBlock';

import './newMesages.css';

const MuseumPageMessages = ({ museumId }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();
   const { loadingStatus, dataMuseumOne } = useSelector((state) => state.museumPages);
   const { isAuth, authUser } = useSelector((store) => store.auth);
   const { dataMuseumMessages } = useSelector((store) => store.messages);

 

   return (
      <MessagesModal>
         <>
            <div className="MessagesModal-header"></div>
            <div className="MessagesModal-section" style={{ height: '100%' }}>
               {isAuth ? (
                  <MessagesBlock authUser={authUser} dataMuseumMessages={dataMuseumMessages} />
               ) : (
                  <NotUserMessagesBlock />
               )}
            </div>
         </>
      </MessagesModal>
   );
};

export default memo(MuseumPageMessages);
