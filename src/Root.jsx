// Root.jsx
import React from "react";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import Axios from "axios";

export default function Root() {
  Axios.defaults.withCredentials = true;

  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}
