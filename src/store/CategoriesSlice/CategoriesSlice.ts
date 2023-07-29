import { createSlice } from "@reduxjs/toolkit";
import { fetchOne } from "./CategoriesThunk";

interface State {
  currentCategory: ICategory | null;
}

const initialState: State = {
  currentCategory: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOne.fulfilled, (state, { payload }) => {
      state.currentCategory = payload;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;