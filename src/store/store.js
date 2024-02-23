import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/LoginSlice/LoginSlice";
import { registerReducer } from "./slices/RegisterSlice/RegisterSlice";
import { verifyAccountReducer } from "./slices/VerifyAccountSlice/VerifyAccountSlice";



const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        verifyAccount: verifyAccountReducer,
    },
    // middleware: (getDefaultMiddlware)=>[
    //     ...getDefaultMiddlware(),
        
    // ]
});

export default store;
