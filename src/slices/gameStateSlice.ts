import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  status: number; // 0 = pas de jeu en cours, 1 = jeu en cours
}

const initialState: GameState = {
  status: 0, // État initial : pas de jeu en cours
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGameState: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    }
  },
});

export const { updateGameState } = gameSlice.actions;

export default gameSlice.reducer;
