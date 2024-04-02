import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const postMuseumTicket = createAsyncThunk(
   'museumTicket/postMuseumTicket',

   async (body, thunkAPI) => {
   
      try {
         const config = body.userToken ? {
            method: 'post',
            url: 'purchase/store',
            data: body.postData,
            headers: {
               Authorization: `Bearer ${body.userToken}`,
            },
         } : {
          method: 'post',
          url: 'purchase/store',
          data: body.postData,
        }

         const response = await instance(config);
         console.log(response, 'response');
        } catch (error) {
          console.log(error, 'error');
         return thunkAPI.rejectWithValue(error);
      }
   },
);
