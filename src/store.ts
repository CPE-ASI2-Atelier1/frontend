import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import cardReducer from './slices/cardSlice';

export const store = configureStore({
  reducer: {
    user : userReducer,
    auth: authReducer,
    cardReducer: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;