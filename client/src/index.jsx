import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "data/context/auth-context";
import App from "./presentation/App";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
