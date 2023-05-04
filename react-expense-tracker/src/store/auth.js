import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isLogin: false, userId: null, token:null};
// console.log(initialAuthState.token);
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.user._id;
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;