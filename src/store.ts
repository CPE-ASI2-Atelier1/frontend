/**
 * @author Arthur Jezequel
 * @author Evann Nalewajek
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import cardReducer from './slices/cardSlice';
import cardCreationReducer from './slices/cardCreationSlice';
import gameReducer from './slices/gameStateSlice';


export const store = configureStore({
  reducer: {
    user : userReducer,
    auth: authReducer,
    cardReducer: cardReducer,
    cardCreationReducer: cardCreationReducer,
    gameState: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;