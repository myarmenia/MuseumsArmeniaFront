import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';
import axios from 'axios';

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
         // const { data } = await instance(`museum/${id}/educational-programs`);
         const { data } = await axios.get(
            `http://localhost:8000/api/museum/${id}/educational-programs`,
         );

         // return thunkAPI.fulfillWithValue(data);
      } catch (error) {
         console.log(error);
         return thunkAPI.rejectWithValue(error.response.data.error);
      }
   },
);
