/**
 * @author Arthur Jezequel
 * @author Evann Nalewajek
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import cardReducer from './slices/cardSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    user : userReducer,
    auth: authReducer,
    cardReducer: cardReducer,
    chat: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;