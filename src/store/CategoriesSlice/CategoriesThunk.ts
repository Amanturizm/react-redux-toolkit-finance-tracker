import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

export const createOne = createAsyncThunk<void, ICategoryForm>(
  'categories/createOne',
  async (newCategory) => {
    await axiosApi.post('/categories.json', newCategory);
  }
);


export const fetchOne = createAsyncThunk<ICategory | null, string>(
  'categories/fetchOne',
  async (id) => {
    const { data } = await axiosApi.get<ICategory | null>(`/categories/${id}.json`);

    if (!data) return null;

    return data;
  }
);

interface IEditCategory {
  id: string;
  newCategory: ICategoryForm
}

export const editOne = createAsyncThunk<void, IEditCategory>(
  'categories/editOne',
  async ({ id, newCategory }) => {
    await axiosApi.put(`/categories/${id}.json`, newCategory);
  }
);

export const deleteOne = createAsyncThunk<void, string>(
  'categories/deleteOne',
  async (id) => {
    await axiosApi.delete(`/categories/${id}.json`);
  }
);