import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/LoginSlice/LoginSlice";
import { registerReducer } from "./slices/RegisterSlice/RegisterSlice";
import { verifyAccountReducer } from "./slices/VerifyAccountSlice/VerifyAccountSlice";
import { authReduser } from "./slices/Auth/AuthSlice";
import { repeatVerifyCodeReducer } from "./slices/RepeatVerifyCodeSlice/RepeatVerifyCodeSlice";



const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        verifyAccount: verifyAccountReducer,
        auth: authReduser,
        resendVerify: repeatVerifyCodeReducer,
    },
    // middleware: (getDefaultMiddlware)=>[
    //     ...getDefaultMiddlware(),
        
    // ]
});

export default store;
