import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "antd/dist/reset.css";

import { HashRouter  } from "react-router-dom";
import "@/styles/index.scss";

import App from "@/routers/index";

ReactDOM.createRoot( document.getElementById("root")! ).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);