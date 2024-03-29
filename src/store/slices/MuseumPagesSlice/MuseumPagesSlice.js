import { createSlice } from '@reduxjs/toolkit';
import { postMuseumPages, postMuseumOnePages, educationalPrograms, getMuseumOneEvents } from './MuseumPagesApi';
const initialState = {
   loadingStatus: 'loading',
   dataMuseum: [],
   dataMuseumOne: {},
   filterDataMuseum: [],
   regions: [],
   educationalProgramsLoad: 'loading',
   dataEducationalPrograms: [],
   loadingMuseumOneEvents: 'loading',
   dataMuseumOneEvents: [],
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
         })

         // educationalPrograms =======================

         .addCase(educationalPrograms.pending, (state) => {
            state.educationalProgramsLoad = 'loading';
            state.dataEducationalPrograms = [];
         })
         .addCase(educationalPrograms.fulfilled, (state, { payload }) => {
            state.educationalProgramsLoad = 'fulfilled';
            state.dataEducationalPrograms = payload.data;
         })
         .addCase(educationalPrograms.rejected, (state, action) => {
            state.educationalProgramsLoad = 'rejected';
            state.dataEducationalPrograms = [];
         })

         // getMuseumOneEvents =======================

         .addCase(getMuseumOneEvents.pending, (state) => {
            state.loadingMuseumOneEvents = 'loading';
            state.dataMuseumOneEvents = [];
         })
         .addCase(getMuseumOneEvents.fulfilled, (state, { payload }) => {
            state.loadingMuseumOneEvents = 'fulfilled';
            state.dataMuseumOneEvents = payload.data;
         })
         .addCase(getMuseumOneEvents.rejected, (state, action) => {
            state.loadingMuseumOneEvents = 'rejected';
            state.dataMuseumOneEvents = [];
         })
   },
});

export const MuseumPagesReducer = MuseumPagesSlice.reducer;
export const { filterRegionMuseum } = MuseumPagesSlice.actions;
