import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

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

export const fetchOne = createAsyncThunk<Omit<ITransactionForm, 'type'> | null, string>(
  'transactions/fetchOne',
  async (id) => {
    const { data } = await axiosApi.get<Omit<ITransaction, 'id'> | null>(`/transactions/${id}.json`);

    if (!data) return null;

    return { category: data.category, amount: data.amount + '' };
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

interface IEdit {
  id: string;
  newTransaction: ITransactionForm;
}

export const editOne = createAsyncThunk<void, IEdit, { state: RootState }>(
  'transactions/editOne',
  async ({ id, newTransaction }, { getState }) => {
    const transactions = getState().transactions.transactions;

    if (!transactions.length) return;

    const datetime: string = transactions.find(transaction => transaction.id === id)?.datetime || '';

    const formattedNewTransaction: Omit<ITransaction, 'id'> = {
      category: newTransaction.category,
      amount: parseInt(newTransaction.amount),
      datetime
    };

    await axiosApi.put(`/transactions/${id}.json`, formattedNewTransaction);
  }
);

export const deleteOne = createAsyncThunk<void, string>(
  'transactions/deleteOne',
  async (id) => {
    await axiosApi.delete(`/transactions/${id}.json`);
  }
);