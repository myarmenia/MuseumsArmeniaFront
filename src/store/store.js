import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/LoginSlice/LoginSlice";
import { registerReducer } from "./slices/RegisterSlice/RegisterSlice";
import {MuseumPagesReducer} from './slices/MuseumPagesSlice/MuseumPagesSlice'


const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        museumPages: MuseumPagesReducer
    },
    // middleware: (getDefaultMiddlware)=>[
    //     ...getDefaultMiddlware(),
        
    // ]
});

export default store;
