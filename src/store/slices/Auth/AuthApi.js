import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
      try {
        const config = {
          method: "get",
          url: 'auth/me',
        };
        
        const response = await instance(config);
        console.log(response.data);
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)