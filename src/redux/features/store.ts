import { configureStore } from "@reduxjs/toolkit";
import essayReducer from './tempEssay';


export const store = configureStore({
    reducer: {
        essayReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;