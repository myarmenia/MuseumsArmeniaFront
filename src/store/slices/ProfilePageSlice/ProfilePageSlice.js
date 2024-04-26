import { createSlice } from '@reduxjs/toolkit';
import { getNotification, postChangeUserPass, postEditUser } from './ProfilePageApi';

const initialState = {
  notification: [],
  editUser: {},
  editPassword: {},
  loading: 'pending'
};

export const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNotification.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.notification = action.payload
      })
      .addCase(getNotification.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(getNotification.rejected, (state, action) => {
        state.loading = 'rejected'
      })

      // =============================================

      .addCase(postEditUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.editUser = action.payload
      })
      .addCase(postEditUser.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(postEditUser.rejected, (state, action) => {
        state.loading = 'rejected'
      })



      // ====================================================


      .addCase(postChangeUserPass.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.editPassword = action.payload
      })
      .addCase(postChangeUserPass.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(postChangeUserPass.rejected, (state, action) => {
        state.loading = 'rejected'
      });
  },
});



export const getChatProfileDates = (state) => state.profilePage;

export const profilePageLoading = (state) => state.profilePage.loading
export const selectNotification = (state) => state.profilePage.notification

export const profilePageReducer = profilePageSlice.reducer;
