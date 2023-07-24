import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Provider store={store}>
        <Provider store={store}>
          <App />
        </Provider>
      </Provider>
    </Provider>
  </React.StrictMode>
);
