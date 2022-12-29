import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "antd/dist/reset.css";

import { BrowserRouter  } from "react-router-dom";
import "@/styles/index.scss";

import App from "@/router/index";
console.log("basename={import.meta.env.BASE_URL}",import.meta.env.BASE_URL);
ReactDOM.createRoot( document.getElementById("root")! ).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);