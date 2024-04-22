import { createSlice } from '@reduxjs/toolkit';
import { getNotification } from './ProfilePageApi';

const initialState = {
  notification: [],
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
      });
  },
});



export const getChatProfileDates = (state) => state.profilePage;

export const profilePageLoading = (state) => state.profilePage.loading
export const selectNotification = (state) => state.profilePage.notification

export const profilePageReducer = profilePageSlice.reducer;
