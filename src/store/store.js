import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/LoginSlice/LoginSlice";
import { registerReducer } from "./slices/RegisterSlice/RegisterSlice";
import { NewsesReducer } from "./slices/newses/NewsesSlice";



const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        newses:NewsesReducer
    },
    // middleware: (getDefaultMiddlware)=>[
    //     ...getDefaultMiddlware(),
        
    // ]
});

export default store;
