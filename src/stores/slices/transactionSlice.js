import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        name: "",
        amount: "",
        category: 1,
    },
    reducers: {
        setTransaction: (state, action) => {
            state.name = action.payload.name;
            state.amount = action.payload.amount;
            state.category = action.payload.category;
        },
    },
});

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;