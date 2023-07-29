import { createSlice } from "@reduxjs/toolkit";
import { createOne, deleteOne, editOne, fetchCategories, fetchOne, fetchTransactions } from "./TransactionsThunk";

interface State {
  transactions: ITransaction[];
  transactionsLoading: boolean;
  currentTransaction: Omit<ITransactionForm, 'type'> | null;
  currentTransactionLoading: boolean;
  submitLoading: boolean;
  categories: ICategory[];
  categoriesLoading: boolean;
  deleteLoading: boolean;
}

const initialState: State = {
  transactions: [],
  transactionsLoading: false,
  currentTransaction: null,
  currentTransactionLoading: false,
  submitLoading: false,
  categories: [],
  categoriesLoading: false,
  deleteLoading: false
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearCurrentTransaction: state => {
      state.currentTransaction = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, state => {state.transactionsLoading = true});
    builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
      state.transactions = payload;
      state.transactionsLoading = false;
    });
    builder.addCase(fetchTransactions.rejected, state => {state.transactionsLoading = false});

    builder.addCase(fetchCategories.pending, state => {state.categoriesLoading = true});
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.categoriesLoading = false;
    });
    builder.addCase(fetchCategories.rejected, state => {state.categoriesLoading = false});

    builder.addCase(fetchOne.pending, state => {state.currentTransactionLoading = true});
    builder.addCase(fetchOne.fulfilled, (state, { payload }) => {
      state.currentTransaction = payload;
      state.currentTransactionLoading = false;
    });
    builder.addCase(fetchOne.rejected, state => {state.currentTransactionLoading = false});

    builder.addCase(createOne.pending, state => {state.submitLoading = true});
    builder.addCase(createOne.fulfilled, state => {state.submitLoading = false});
    builder.addCase(createOne.rejected, state => {state.submitLoading = false});

    builder.addCase(editOne.pending, state => {state.submitLoading = true});
    builder.addCase(editOne.fulfilled, state => {state.submitLoading = false});
    builder.addCase(editOne.rejected, state => {state.submitLoading = false});

    builder.addCase(deleteOne.pending, state => {state.deleteLoading = true});
    builder.addCase(deleteOne.fulfilled, state => {state.deleteLoading = false});
    builder.addCase(deleteOne.rejected, state => {state.deleteLoading = false});
  }
});

export const transactionsReducer = transactionsSlice.reducer;
export const { clearCurrentTransaction } = transactionsSlice.actions;