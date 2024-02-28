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
