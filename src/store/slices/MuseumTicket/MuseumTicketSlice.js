import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   modalTicketIsOpen: false,
   ticketType: { kindOf: null, type: null },
   tickets: [
      { id: 1, price: 100, min: 0, max: 10, type: 'standart', count: 0},
      { id: 1, price: 50, min: 0, max: 10, type: 'discount', count: 0 },
      { id: 1, price: 0, min: 0, max: 10, type: 'free', count: 0 },
   ],
};

const MuseumTicketSlice = createSlice({
   name: 'museum',
   initialState,
   reducers: {
      setModalTicketIsOpen(state, { payload }) {
         state.modalTicketIsOpen = payload;
      },
      setTicketType(state, { payload }) {
         state.ticketType = payload;
      },
   },
   // extraReducers: (builder) => {
   //    builder

   //       .addCase(postMuseumPages.pending, (state) => {
   //          state.loadingStatus = 'loading';
   //       })
   //       .addCase(postMuseumPages.fulfilled, (state, { payload }) => {
   //          state.loadingStatus = 'fulfilled';
   //          state.dataMuseum = payload.data.museums;
   //          state.filterDataMuseum = payload.data.museums;
   //          state.regions = payload.data.regions;
   //       })
   //       .addCase(postMuseumPages.rejected, (state, action) => {
   //          state.loadingStatus = 'rejected';
   //          state.dataMuseum = [];
   //          state.filterDataMuseum = [];
   //       })
   // },
});

export const MuseumTicketReducer = MuseumTicketSlice.reducer;
export const { setModalTicketIsOpen, setTicketType } = MuseumTicketSlice.actions;
