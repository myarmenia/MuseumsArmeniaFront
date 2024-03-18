import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';
import axios from 'axios';

export const postAuthUserMessages = createAsyncThunk(
   'NewMessages/postAuthUserMessages',

   async (body, thunkAPI) => {
      try {
         const config = {
            method: 'post',
            url: 'chat/add-message',
            data: body,
         };

         const response = await instance(config);

         //  return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);

export const getAuthUserAllMessages = createAsyncThunk(
   'NewMessages/getAuthUserMessages',

   async (body, thunkAPI) => {
      try {
         const response = await instance(`chat/get-museum-message/${body}`);
         return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);

export const postNotUserMessages = createAsyncThunk(
   'NewMessages/postNotUserMessages',

   async (body, thunkAPI) => {
      try {
         const config = {
            method: 'post',
            url: 'chat/add-message',
            data: body,
         };

         const response = await instance(config);
         console.log(response, 'responseeeee');

         //  return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);

export const deleteMuseumMessages = createAsyncThunk(
   'NewMessages/deleteMuseumMessages',

   async (body, thunkAPI) => {
      try {
         const response = await instance(`chat/delete-chat/${body}`);
         console.log(response, 'responseeeee');

         //  return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);
