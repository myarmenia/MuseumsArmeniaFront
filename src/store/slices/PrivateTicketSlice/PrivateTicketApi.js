import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getPrivateTicket = createAsyncThunk(
  'privateTicket/getPrivateTicket',
  async (type, thunkAPI) => {

      try {
        const config = {
          method: "get",
          url: `tickets?type=${type}`,
        };
        
        const response = await instance(config); 
        return response?.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)