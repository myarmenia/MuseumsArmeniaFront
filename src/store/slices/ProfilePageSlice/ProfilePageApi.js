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


// ===================================================


export const postEditUser = createAsyncThunk(
  'editUser/postEditUser',

  async (body, thunkAPI) => {
      try {

        const config = {
          method: "post",
          url: "user/edit",
          data: body,
        };
  
        const response = await instance(config);
        return response?.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)




export const postChangeUserPass = createAsyncThunk(
  'changeUserPass/postChangeUserPass',

  async (body, thunkAPI) => {
      try {

        const config = {
          method: "post",
          url: "user/editPassword",
          data: body,
        };
  
        const response = await instance(config);
        return response?.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)