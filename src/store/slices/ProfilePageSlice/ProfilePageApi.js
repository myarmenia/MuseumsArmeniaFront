import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const getNotification = createAsyncThunk(
  'notification/getNotification',
  async (_, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: 'auth/notification/unread',
      };

      const response = await instance(config);
      return response?.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);