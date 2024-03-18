import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   messagesType: null,
};

const MessagesBotSlice = createSlice({
   name: 'MessagesBot',
   initialState,
   reducers: {
      setMessagesType(state, { payload }) {
         state.messagesType = payload;
      },
     
   },
   
});

export const MessagesBot = MessagesBotSlice.reducer;
export const { setMessagesType } = MessagesBotSlice.actions;