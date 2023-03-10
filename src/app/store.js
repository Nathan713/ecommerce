import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products/productsSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    products: persistedReducer,
    cart: cartReducer,
  },
});

export const persistor = persistStore(store);
