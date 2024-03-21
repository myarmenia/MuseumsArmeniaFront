import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (id, thunkAPI) => {
      try {
        const config = {
          method: "get",
          url: `tickets/museum/events?museum_id=${id}`,
        };
        
        const response = await instance(config);
        console.log(response.data);
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)