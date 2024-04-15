import { createSlice } from '@reduxjs/toolkit';
import { getChatProfileData } from './ChatProfileApi';

const initialState = {
  chatProfileData: []
};

export const ChatProfileSlice = createSlice({
  name: 'chatprofile',
  initialState,
  reducers: {
    // setType: (state, action) => {
    //   state.types = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChatProfileData.fulfilled, (state, action) => {
        state.chatProfileData = action.payload.data
      })
      .addCase(getChatProfileData.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(getChatProfileData.rejected, (state, action) => {
        console.log('chdarav');
      });
  },
});

// export const {
//   //   setErrorMessage,
// } = currentLessonSlice.actions;


export const getChatProfileDates = (state) => state.chatprofile.chatProfileData;

export const ChatProfileReducer = ChatProfileSlice.reducer;
