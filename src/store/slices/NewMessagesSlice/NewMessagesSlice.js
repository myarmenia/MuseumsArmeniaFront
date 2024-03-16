import { createSlice } from '@reduxjs/toolkit';
import { getAuthUserAllMessages } from './NewMessagesSliceApi';
const initialState = {
   loadingStatus: 'loading',
   modalIsOpen: false,
   messagesType: null,
   dataMuseumMessages: []
};

const NewMessagesSlice = createSlice({
   name: 'NewMessages',
   initialState,
   reducers: {
      setIsOpen(state, { payload }) {
         state.modalIsOpen = payload;
      },
      setMessagesType(state, { payload }) {
         state.messagesType = payload;
      },
   },
   extraReducers: (builder) => {
      builder
      // postMuseumPages===========================

      .addCase(getAuthUserAllMessages.pending, (state) => {
         state.loadingStatus = 'loading';
      })
      .addCase(getAuthUserAllMessages.fulfilled, (state, { payload }) => {
         state.loadingStatus = 'fulfilled';
         state.dataMuseumMessages = payload
      })
      .addCase(getAuthUserAllMessages.rejected, (state, action) => {
         state.loadingStatus = 'rejected';
         state.dataMuseum = [];
         state.filterDataMuseum = [];
      })
   },
});

export const NewMessagesReducer = NewMessagesSlice.reducer;
export const { setIsOpen, setMessagesType } = NewMessagesSlice.actions;
