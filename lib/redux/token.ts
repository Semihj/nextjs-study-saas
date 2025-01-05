import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  token:0,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
 


  },
});

export const { setToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
