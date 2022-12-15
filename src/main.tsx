import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "antd/dist/reset.css";

import { BrowserRouter, Link  } from "react-router-dom";
import "@/styles/index.scss";

import App from "@/routers/index";

ReactDOM.createRoot( document.getElementById("root")! ).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);