import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "../store/Transactions/TransactionsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;