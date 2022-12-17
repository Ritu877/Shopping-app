import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

import { intersection } from 'lodash';

const root = ReactDOM.createRoot(document.getElementById("root"));




root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

reportWebVitals();