import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isLogin: false, token:null, isPremium: false};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLogin = true;
            state.token = action.payload.token;
            state.isPremium = action.payload.ispremiumuser;
        },
        logout(state) {
            state.isLogin = false;
            state.token = null;
            state.isPremium = false;
        },
        premium(state, action){
            state.isPremium = action.payload;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;