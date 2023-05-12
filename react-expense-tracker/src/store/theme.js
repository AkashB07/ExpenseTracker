import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {theme: false};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers:{
        theme(state){
            state.theme = !state.theme;
        },
        themeLog(state, action){
            state.theme = action.payload;
        }
    },
});

export const themesActions = themeSlice.actions;
export default themeSlice.reducer;