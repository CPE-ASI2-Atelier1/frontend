import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user:{},
    submitted_user:{},
  },
  reducers: {
    update_user_action: (state, action) => {
        state.user = action.payload.user
    },
    submit_user_action: (state, action) => {
        console.log("User to Submit");
        console.log(action.payload.user);
        state.submitted_user = action.payload.user
    },
}
})

export const { update_user_action,submit_user_action } = userSlice.actions

export default userSlice.reducer
