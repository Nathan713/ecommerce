import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import SearchPage from "./Pages/SearchPage";
import CategoryPage from "./Pages/CategoryPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search/:search" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
