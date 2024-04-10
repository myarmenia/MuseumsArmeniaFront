import { createSlice } from '@reduxjs/toolkit';
import {
   postMuseumPages,
   postMuseumOnePages,
   educationalPrograms,
   getMuseumOneEvents,
   getMuseumOneProducts,
} from './MuseumPagesApi';
const initialState = {
   loadingStatus: 'loading',
   dataMuseum: [],
   loadingdataMuseumOne: 'loading',
   dataMuseumOne: {},
   filterDataMuseum: [],
   regions: [],
   educationalProgramsLoad: 'loading',
   dataEducationalPrograms: [],
   loadingMuseumOneEvents: 'loading',
   dataMuseumOneEvents: [],
   loadingMuseumProducts: 'loading',
   dataMuseumProducts: {
      dataProducts: [],
      products_category: [],
      pageCount: 0,
      totalCount: 0,
   },
};

const MuseumPagesSlice = createSlice({
   name: 'museum',
   initialState,
   reducers: {
      filterRegionMuseum(state, { payload }) {
         if (payload.type) {
            state.filterDataMuseum = state.dataMuseum.filter((el) => el.region === payload.type);
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
            state.loadingdataMuseumOne = 'loading';
         })
         .addCase(postMuseumOnePages.fulfilled, (state, { payload }) => {
            state.loadingdataMuseumOne = 'fulfilled';
            state.dataMuseumOne = payload.data;
         })
         .addCase(postMuseumOnePages.rejected, (state, action) => {
            state.loadingdataMuseumOne = 'rejected';
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

         // getMuseumOneProducts =======================

         .addCase(getMuseumOneProducts.pending, (state) => {
            state.loadingMuseumProducts = 'loading';
            state.dataMuseumProducts.dataProducts = [];
            state.dataMuseumProducts.products_category = [];
         })
         .addCase(getMuseumOneProducts.fulfilled, (state, { payload }) => {
            console.log(payload, 222222222222);
            state.loadingMuseumProducts = 'fulfilled';
            state.dataMuseumProducts.dataProducts = payload.data.products;
            state.dataMuseumProducts.products_category = payload.data.products_category;
            state.dataMuseumProducts.pageCount = payload.params.page_count;
            state.dataMuseumProducts.totalCount = payload.params.total_count;
         })
         .addCase(getMuseumOneProducts.rejected, (state, action) => {
            state.loadingMuseumProducts = 'rejected';
            state.dataMuseumProducts.dataProducts = [];
            state.dataMuseumProducts.products_category = [];
            state.dataMuseumProducts.pageCount = 0;
            state.dataMuseumProducts.totalCount = 0;
         });
   },
});

export const MuseumPagesReducer = MuseumPagesSlice.reducer;
export const { filterRegionMuseum } = MuseumPagesSlice.actions;
