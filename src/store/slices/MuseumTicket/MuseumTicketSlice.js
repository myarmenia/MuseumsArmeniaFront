import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   modalTicketIsOpen: false,
   ticketType: { kindOf: null, type: null },
   tickets: [
      { id: 1, price: 100, min: 0, max: 10, type: 'standart', count: 0 },
      { id: 1, price: 50, min: 0, max: 10, type: 'discount', count: 0 },
      { id: 1, price: 0, min: 0, max: 10, type: 'free', count: 0 },
   ],
   dataItems: [],
};

const MuseumTicketSlice = createSlice({
   name: 'MuseumTicketSlice',
   initialState,
   reducers: {
      setModalTicketIsOpen(state, { payload }) {
         state.modalTicketIsOpen = payload;
      },
      setTicketType(state, { payload }) {
         state.ticketType = payload;
      },
      setDataItems(state, { payload }) {
         
         const findticketsRes = state.tickets.find((el) => el.type === payload.obj.type);
         const findDataItemsRes = state.dataItems.find((el) => el.type === payload.obj.type);
         if (findticketsRes) {
            if (findDataItemsRes) {
               if (payload.dovnUp === 'up' && findticketsRes.count < findticketsRes.max) {
                  findticketsRes.count += 1;
                  findDataItemsRes.quantity += 1;
               } else if (payload.dovnUp === 'down' && findticketsRes.count > 0) {
                  findticketsRes.count -= 1;
                  findDataItemsRes.quantity -= 1;
               }

               if (payload.dovnUp === 'down' && findticketsRes.count === 0) {
                 state.dataItems = state.dataItems.filter((el)=> el.type !== payload.obj.type)
               }
            } else {
               if (payload.dovnUp === 'up' && findticketsRes.count < findticketsRes.max) {
                  findticketsRes.count += 1;
               } else if (payload.dovnUp === 'down' && findticketsRes.count > 0) {
                  findticketsRes.count -= 1;
               }

               state.dataItems.push({
                  type: findticketsRes.type,
                  id: findticketsRes.id,
                  quantity: 1,
               });
            }
         }

         if (findDataItemsRes) {
         }
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
export const { setModalTicketIsOpen, setTicketType, setDataItems } = MuseumTicketSlice.actions;
