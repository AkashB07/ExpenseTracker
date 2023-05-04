import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expense:[],
    totalexpense:0,
};

const expenseSlice = createSlice({
    name:"expense",
    initialState: initialExpenseState,
    reducers:{
        expense(state, action){
            state.expense = [...action.payload];
        },
        totalexpense(state, action){
            state.totalexpense = state.totalexpense + action.payload;
        },
        cleartotalexpense(state){
            state.totalexpense = 0
        }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;