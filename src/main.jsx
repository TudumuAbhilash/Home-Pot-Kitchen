import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider, } from "./admin/context/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AdminAuthProvider> 
      <App />
      </AdminAuthProvider>
    </CartProvider>
  </React.StrictMode>
);