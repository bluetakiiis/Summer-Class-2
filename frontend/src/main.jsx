import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { MovieProvider } from "./context/MovieProvider";
import AuthProvider from "./context/AuthProvider";
import TMDBProvider from "./context/TMDBProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <TMDBProvider>
            <App />
          </TMDBProvider>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
