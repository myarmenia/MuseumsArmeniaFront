import { createSlice } from '@reduxjs/toolkit';
import { postMuseumPages } from './MuseumPagesApi';
const initialState = {
   loadingStatus: 'loading',
   dataMuseum: [],
   regions: [],
};

const MuseumPagesSlice = createSlice({
   name: 'museum',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(postMuseumPages.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(postMuseumPages.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.dataMuseum = payload.data.museums;
            state.regions = payload.data.regions;
         })
         .addCase(postMuseumPages.rejected, (state, action) => {
            state.status = 'rejected';
         });
   },
});

export const MuseumPagesReducer = MuseumPagesSlice.reducer;
