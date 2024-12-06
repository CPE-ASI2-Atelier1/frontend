import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../components/Login/containers/User';

interface UserState {
    user: IUser;
    submitted_user: IUser;
}

const initialState: UserState = {
    user: {
      id: -1,
      username: "string",
      password: "string",
      money: 5,
    },
    submitted_user: {
      id: -1,
      username: "string",
      password: "string",
      money: 5,
    },
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        update_user_action: (state, action: PayloadAction<{ user: IUser }>) => {
            state.user = action.payload.user;
        },
        submit_user_action: (state, action: PayloadAction<{ user: IUser }>) => {
            console.log('User to Submit', action.payload.user);
            state.submitted_user = action.payload.user;
        },
    },
});

export const { update_user_action, submit_user_action } = userSlice.actions;

export default userSlice.reducer;
