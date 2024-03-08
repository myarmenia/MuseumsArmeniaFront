import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   loadingStatus: 'loading',
   modalIsOpen: false,
   messagesType: null,
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
   // extraReducers: (builder) => {
   //    builder
   //    postMuseumPages===========================
   //    .addCase(postMuseumPages.pending, (state) => {
   //       state.loadingStatus = 'loading';
   //    })
   //    .addCase(postMuseumPages.fulfilled, (state, { payload }) => {
   //       state.loadingStatus = 'fulfilled';
   //       state.dataMuseum = payload.data.museums;
   //       state.filterDataMuseum = payload.data.museums;
   //       state.regions = payload.data.regions;
   //    })
   //    .addCase(postMuseumPages.rejected, (state, action) => {
   //       state.loadingStatus = 'rejected';
   //       state.dataMuseum = [];
   //       state.filterDataMuseum = [];
   //    })
   // },
});

export const NewMessagesReducer = NewMessagesSlice.reducer;
export const { setIsOpen, setMessagesType } = NewMessagesSlice.actions;
