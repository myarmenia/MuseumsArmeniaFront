import { createSlice } from '@reduxjs/toolkit';

import { postMuseumTicket } from './MuseumTicketApi';
import { postMuseumOnePages } from '../MuseumPagesSlice/MuseumPagesApi';

const initialState = {
   modalTicketIsOpen: false,
   ticketType: { kindOf: null, type: null, ticketType: '' },
   tickets: [
      { id: 1, price: 100, min: 0, max: 10, type: 'standart', count: 0 },
      { id: 1, price: 50, min: 0, max: 10, type: 'discount', count: 0 },
      { id: 1, price: 0, min: 0, max: 10, type: 'free', count: 0 },
      { id: 2, price: 20000, min: 0, max: 5, type: 'subscription', count: 0 },
   ],
   dataItems: [],
   ticketLoading: '',
   success: null,
   responseMessages: '',
   paymentsUrl: '',
   statusInfoModal: { status: false, text: '' },
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
      setStatusInfoModal(state, { payload }) {
         state.statusInfoModal = payload;
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
                  state.dataItems = state.dataItems.filter((el) => el.type !== payload.obj.type);
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
      setResetDataItems(state, { payload }) {
         state.dataItems = [];
         state.tickets = state.tickets.map((el) => {
            return { ...el, count: 0 };
         });
         state.responseMessages = '';
         state.ticketType = { kindOf: null, type: null, ticketType: '' };
      },
   },
   extraReducers: (builder) => {
      builder

         .addCase(postMuseumTicket.pending, (state) => {
            state.ticketLoading = 'loading';
         })
         .addCase(postMuseumTicket.fulfilled, (state, { payload }) => {
            state.ticketLoading = 'fulfilled';
            state.paymentsUrl = payload.data.redirect_url;
            state.success = payload.success;
         })
         .addCase(postMuseumTicket.rejected, (state, { payload }) => {
            // console.log(payload, 'payload');
            state.ticketLoading = 'rejected';
            state.success = payload.success ?? false;
            state.responseMessages = payload.message;
         })

         .addCase(postMuseumOnePages.fulfilled, (state, { payload }) => {
            if (payload.data?.tickets) {
               state.tickets = payload.data?.tickets.map((el) => {
                  return { ...el, count: 0 };
               });
            }
         })
         .addCase(postMuseumOnePages.rejected, (state, { payload }) => {
            state.tickets = [
               { id: 1, price: 100, min: 0, max: 10, type: 'standart', count: 0 },
               { id: 1, price: 50, min: 0, max: 10, type: 'discount', count: 0 },
               { id: 1, price: 0, min: 0, max: 10, type: 'free', count: 0 },
               { id: 2, price: 20000, min: 0, max: 5, type: 'subscription', count: 0 },
            ];
         });
   },
});

export const MuseumTicketReducer = MuseumTicketSlice.reducer;
export const {
   setModalTicketIsOpen,
   setTicketType,
   setDataItems,
   setResetDataItems,
   setStatusInfoModal,
} = MuseumTicketSlice.actions;
