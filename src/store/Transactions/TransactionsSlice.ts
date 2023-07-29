import { createSlice } from "@reduxjs/toolkit";
import {fetchCategories, fetchOne, fetchTransactions} from "./TransactionsThunk";

interface State {
  transactions: ITransaction[];
  currentTransaction: Omit<ITransactionForm, 'type'> | null;
  categories: ICategory[];
}

const initialState: State = {
  transactions: [],
  currentTransaction: null,
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

    builder.addCase(fetchOne.fulfilled, (state, { payload }) => {
      state.currentTransaction = payload;
    });
  }
});

export const transactionsReducer = transactionsSlice.reducer;