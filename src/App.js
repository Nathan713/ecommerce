import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
