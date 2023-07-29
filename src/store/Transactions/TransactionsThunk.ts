import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

export const fetchTransactions = createAsyncThunk<ITransaction[]>(
  'transactions/fetch-all',
  async () => {
    const { data: transactions } = await axiosApi.get<ITransactionApi | null>('/transactions.json');

    if (!transactions) return [];

    return Object.keys(transactions).map(id => ({ ...transactions[id], id }));
  }
);

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'transactions/fetch-categories',
  async () => {
    const { data: categories } = await axiosApi.get<ICategoryApi | null>('/categories.json');

    if (!categories) return [];

    return Object.keys(categories).map(id => ({ ...categories[id], id }));
  }
);

export const createOne = createAsyncThunk<void, ITransactionForm>(
  'transactions/createOne',
  async (newTransaction) => {
    const datetime = new Date().toISOString();

    const formattedNewTransaction: Omit<ITransaction, 'id'> = {
      category: newTransaction.category,
      amount: parseInt(newTransaction.amount),
      datetime
    };

    await axiosApi.post('/transactions.json', formattedNewTransaction);
  }
);