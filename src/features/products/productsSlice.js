import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commerce from "../../lib/commerce";

const initialState = {
  entities: [],
  loading: false,
};

export const getProducts = createAsyncThunk(
  "products.getProducts",
  async ({ searchBy, query, slugs }, thunkAPI) => {
    //searchBy 1 == all, 2 == query, 3 == category slugs
    // query == string, slugs == array of strings
    console.log(searchBy);
    console.log(query);
    console.log(slugs);
    try {
      let products = [];
      if (searchBy === 1) {
        products = await commerce.products.list({});
      } else if (searchBy === 2) {
        products = await commerce.products.list({
          query: query,
        });
      } else if (searchBy === 3) {
        products = await commerce.products.list({
          category_slug: slugs,
        });
      }
      console.log(products);
      if (products.data === undefined) {
        // console.log(products);
        return [];
      }
      // console.log(products);
      return products.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
