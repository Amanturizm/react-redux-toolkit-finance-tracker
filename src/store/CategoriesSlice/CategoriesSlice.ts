import { createSlice } from "@reduxjs/toolkit";
import { createOne, deleteOne, editOne, fetchOne } from "./CategoriesThunk";

interface State {
  currentCategory: ICategory | null;
  currentCategoryLoading: boolean;
  submitLoading: boolean;
  deleteLoading: boolean;
}

const initialState: State = {
  currentCategory: null,
  currentCategoryLoading: false,
  submitLoading: false,
  deleteLoading: false
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: state => {
      state.currentCategory = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOne.pending, state => {state.currentCategoryLoading = true});
    builder.addCase(fetchOne.fulfilled, (state, { payload }) => {
      state.currentCategory = payload;
      state.currentCategoryLoading = false;
    });
    builder.addCase(fetchOne.rejected, state => {state.currentCategoryLoading = false});

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

export const categoriesReducer = categoriesSlice.reducer;
export const { clearCurrentCategory } = categoriesSlice.actions;