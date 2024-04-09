import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const postMuseumPages = createAsyncThunk(
   'MuseumPages/postMuseumPages',

   async (body, thunkAPI) => {
      try {
         const { data } = await instance('museum/get-museum');

         return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   },
);

export const postMuseumOnePages = createAsyncThunk(
   'MuseumPagesOne/postMuseumPagesOne',
   async (body, thunkAPI) => {
      const id = body?.id ? `/${body.id}` : '';
      try {
         const { data } = await instance(`museum/get-museum${id}`);
         return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   },
);

export const educationalPrograms = createAsyncThunk(
   'MuseumPagesOne/educationalPrograms',
   async (body, thunkAPI) => {
      const id = body?.id ? `${body.id}` : '';
      try {
         const { data } = await instance(`museum/${id}/educational-programs`);

         return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   },
);
export const getMuseumOneEvents = createAsyncThunk(
   'MuseumPagesOne/getMuseumOneEvents',
   async (body, thunkAPI) => {
      const id = body?.id ? `${body.id}` : '';
      try {
         const { data } = await instance(`museum/${id}/events`);

         return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         console.log(error);
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   },
);

export const getMuseumOneProducts = createAsyncThunk(
   'MuseumPagesOne/getMuseumOneProducts',
   async (body, thunkAPI) => {
      console.log(body, 'body');
      const museumId = body?.museumId ? `${body.museumId}` : '';
      const productId = body?.productId ? `?product_category_id=${body.productId}` : '';

      try {
         const { data } = await instance(`museum/${museumId}/products${productId}`);
         return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         console.log(error);
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   },
);
