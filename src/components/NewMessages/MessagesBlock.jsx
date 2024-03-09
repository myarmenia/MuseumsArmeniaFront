import React, { memo, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { postAuthUserMessages } from '../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import NotUserMessagesBlock from './NotUserMessagesBlock';

const MessagesBlock = ({ authUser, isAuth }) => {
   const inpMesagesRef = useRef('');
   const dispatch = useDispatch();
   const { dataMuseumOne } = useSelector((store) => store.museumPages);
   const { messagesType } = useSelector((store) => store.messages);
   const [inputValue, setInputvalue] = useState('');

   const addMessages = useCallback(() => {
      if (inpMesagesRef.current.value !== '') {
         setInputvalue(inpMesagesRef.current.value);
         const newMessages = {
            email: authUser.email,
            text: inpMesagesRef.current.value,
            type: messagesType,
            museum_id: dataMuseumOne.id,
            title: 'jhjkb jkkbzca kgjjbavc',
         };

         dispatch(postAuthUserMessages(newMessages));
         inpMesagesRef.current.value = '';
      }
   }, []);

   return (
      <div className="MessagesBlock">
         {isAuth ? (
            <div>
               <div className="messages_list"></div>
               <div className="messages_add">
                  <input className="messages_add-input" type="text" ref={inpMesagesRef} />
                  {/* <button onClick={addMessages}>uxarkel</button> */}
                  <ButtonSecond txt="5" minWidth="100px" onClick={addMessages} />
               </div>
            </div>
         ) : (
            <NotUserMessagesBlock />
         )}
      </div>
   );
};

export default memo(MessagesBlock);
