import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { Provider } from "react-redux";

import { HashRouter  } from "react-router-dom";
import store from "@/store";
import "@/styles/index.scss";
import {persistor} from "@/store/index";
import {PersistGate} from "redux-persist/lib/integration/react";

import App from "@/router/index";
ReactDOM.createRoot( document.getElementById("root")! ).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);