import { createSlice } from "@reduxjs/toolkit";
import {fetchCategories, fetchTransactions} from "./TransactionsThunk";

interface State {
  transactions: ITransaction[];
  categories: ICategory[];
}

const initialState: State = {
  transactions: [],
  categories: []
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
      state.transactions = payload;
    });

    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
  }
});

export const transactionsReducer = transactionsSlice.reducer;