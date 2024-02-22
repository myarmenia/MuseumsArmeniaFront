import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postLogin = createAsyncThunk(
    'login/postLogin',

    async (body, thunkAPI) => {
        try {
          const signInData = {
            email: body.email,
            password: body.password,
            remember_me: body.remember_me
          };

          const config = {
            method: "post",
            url: "auth/login",
            data: signInData,
          };
    
          const response = await instance(config);
          sessionStorage.setItem("token", response.data.access_token);
          sessionStorage.setItem("isAuth", true);
          
          return response?.data
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error);
        }
      }
)