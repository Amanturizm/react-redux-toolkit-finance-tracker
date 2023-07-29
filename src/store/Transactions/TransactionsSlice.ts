import { createSlice } from "@reduxjs/toolkit";

interface State {

}

const initialState: State = {

};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export const transactionsReducer = transactionsSlice.reducer;