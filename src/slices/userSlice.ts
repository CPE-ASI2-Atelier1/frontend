/**
 * @author Evann Nalewajek
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from "../types/IUser";

interface UserState {
    user: IUser | null;
    submitted_user: IUser | null;
}

const initialState: UserState = {
    user: null,
    submitted_user: null,
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
        logout_user_action: (state) => {
            state.user = null;
        },
    },
});

export const { update_user_action, submit_user_action, logout_user_action } = userSlice.actions;

export default userSlice.reducer;