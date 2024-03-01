import { createSlice } from '@reduxjs/toolkit';
import { postMuseumPages, postMuseumOnePages } from './MuseumPagesApi';
const initialState = {
   loadingStatus: 'loading',
   dataMuseum: [],
   dataMuseumOne: {},
   filterDataMuseum: [],
   regions: [],
};

const MuseumPagesSlice = createSlice({
   name: 'museum',
   initialState,
   reducers: {
      filterRegionMuseum(state, { payload }) {
         if (payload.region) {
            state.filterDataMuseum = state.dataMuseum.filter((el) => el.region === payload.region);
         } else {
            state.filterDataMuseum = state.dataMuseum;
         }
      },
   },
   extraReducers: (builder) => {
      builder
         // postMuseumPages===========================
         .addCase(postMuseumPages.pending, (state) => {
            state.loadingStatus = 'loading';
         })
         .addCase(postMuseumPages.fulfilled, (state, { payload }) => {
            state.loadingStatus = 'fulfilled';
            state.dataMuseum = payload.data.museums;
            state.filterDataMuseum = payload.data.museums;
            state.regions = payload.data.regions;
         })
         .addCase(postMuseumPages.rejected, (state, action) => {
            state.loadingStatus = 'rejected';
            state.dataMuseum = [];
            state.filterDataMuseum = [];
         })

         // postMuseumOnePages ========================
         .addCase(postMuseumOnePages.pending, (state) => {
            state.loadingStatus = 'loading';
         })
         .addCase(postMuseumOnePages.fulfilled, (state, { payload }) => {
            state.loadingStatus = 'fulfilled';
            state.dataMuseumOne = payload.data;
         })
         .addCase(postMuseumOnePages.rejected, (state, action) => {
            state.loadingStatus = 'rejected';
            state.dataMuseumOne = {};
         });
   },
});

export const MuseumPagesReducer = MuseumPagesSlice.reducer;
export const { filterRegionMuseum } = MuseumPagesSlice.actions;
