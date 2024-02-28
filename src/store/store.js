import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './slices/LoginSlice/LoginSlice';
import { registerReducer } from './slices/RegisterSlice/RegisterSlice';
import { verifyAccountReducer } from './slices/VerifyAccountSlice/VerifyAccountSlice';
import { authReduser } from './slices/Auth/AuthSlice';
import { repeatVerifyCodeReducer } from './slices/RepeatVerifyCodeSlice/RepeatVerifyCodeSlice';
import { logOutReducer } from './slices/LogOutSlice/LogOutSlice';
import { googleLoginReducer } from './slices/GoogleLoginSlice/GoogleLoginSlice';
import { ResetPasswordWithEmailReducer } from './slices/ResetPasswordWithEmailSlice/ResetPasswordWithEmailSlice';
import { checkForgotTokenReducer } from './slices/CheckForgotTokenSlice/CheckForgotTokenSlice';
import { newPasswordReducer } from './slices/NewPasswordeSlise/NewPasswordeSlise';
import { resendForgotReducer } from './slices/ResendForgotSlice/ResendForgotSlice';
import { MuseumPagesReducer } from './slices/MuseumPagesSlice/MuseumPagesSlice';

const store = configureStore({
   reducer: {
      login: loginReducer,
      register: registerReducer,
      verifyAccount: verifyAccountReducer,
      auth: authReduser,
      resendVerify: repeatVerifyCodeReducer,
      logOut: logOutReducer,
      googleLogin: googleLoginReducer,
      resetWithEmail: ResetPasswordWithEmailReducer,
      checkForgotToken: checkForgotTokenReducer,
      newPassword: newPasswordReducer,
      resendForgot: resendForgotReducer,
      museumPages: MuseumPagesReducer,
   },
   // middleware: (getDefaultMiddlware)=>[
   //     ...getDefaultMiddlware(),

   // ]
});

export default store;
