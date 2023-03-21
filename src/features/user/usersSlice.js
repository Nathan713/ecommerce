import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
