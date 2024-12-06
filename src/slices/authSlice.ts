import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    password: '',
    confirmPassword: '',
    passwordMatch: true,
  },
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
      state.passwordMatch = state.password === state.confirmPassword;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
      state.passwordMatch = state.password === state.confirmPassword;
    },
  }
});

export const { setPassword, setConfirmPassword } = authSlice.actions;

export default authSlice.reducer;