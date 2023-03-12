import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commerce from "../../lib/commerce";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
};

export const addItem = createAsyncThunk(
  "cart.addItem",
  async ({ productId, quantity, variantId }, thunkAPI) => {
    try {
      console.log(variantId);
      let cart = {};
      cart = await commerce.cart.add(productId, quantity, variantId);
      console.log(cart);
      return cart.cart;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const deleteItem = createAsyncThunk(
  "cart.deleteItem",
  async ({ itemId }, thunkAPI) => {
    try {
      console.log(itemId);
      let cart = {};
      cart = await commerce.cart.remove(itemId);
      console.log(cart);
      return cart.cart;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const retrieveCart = createAsyncThunk(
  "cart.retrieveCart",
  async (thunkAPI) => {
    try {
      let cart = {};
      cart = await commerce.cart.retrieve();
      console.log(cart);
      return cart;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        console.log("action = ", action);
        state.items = action.payload.line_items;
        state.totalPrice = action.payload.subtotal.formatted_with_symbol;
        state.totalQuantity = action.payload.total_items;
      })
      .addCase(addItem.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      })
      .addCase(retrieveCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(retrieveCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.line_items;
        state.totalPrice = action.payload.subtotal.formatted_with_symbol;
        state.totalQuantity = action.payload.total_items;
      })
      .addCase(retrieveCart.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        console.log("action = ", action);
        state.items = action.payload.line_items;
        state.totalPrice = action.payload.subtotal.formatted_with_symbol;
        state.totalQuantity = action.payload.total_items;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      });
  },
});

export const cartReducer = cartSlice.reducer;
