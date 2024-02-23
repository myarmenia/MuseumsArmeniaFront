import { createSlice } from "@reduxjs/toolkit";
import { postRepeatVerifyCode } from "./RepeatVerifyCodeApi";

const initialState = {
   data: {
      success: false,
      message: ""
   },
   status: 'idle',
   error: null,
   };

const repeatVerifyCodeSlice = createSlice({
    name: 'resendVerify',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postRepeatVerifyCode.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postRepeatVerifyCode.fulfilled, (state, action) => {
            state.data = action.payload
             state.status = 'succes';
          })
          .addCase(postRepeatVerifyCode.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            // state.data = action.payload
            // console.log(state.data, 'eeeeeee');
          });
    },
 });
 

export const selectRepeatVerifyAccount = (state) => state.resendVerify
export const getRepeatVerifyData = (state) => state.resendVerify.data

 export const {} = repeatVerifyCodeSlice.actions

export const repeatVerifyCodeReducer =  repeatVerifyCodeSlice.reducer