import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "../store/Transactions/TransactionsSlice";
import { categoriesReducer } from "../store/CategoriesSlice/CategoriesSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;