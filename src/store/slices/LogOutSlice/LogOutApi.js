import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getLogOut = createAsyncThunk(
  'logOut/getLogOut',
  async (_, thunkAPI) => {
      try {
        const config = {
          method: "get",
          url: 'auth/logout',
        };
        
        const response = await instance(config);
        localStorage.removeItem("token");
        localStorage.removeItem("isAuth");
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)