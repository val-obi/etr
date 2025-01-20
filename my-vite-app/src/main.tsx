import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WalletProviderComponent from "./WalletProvider";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WalletProviderComponent>
        <App />
      </WalletProviderComponent>
    </React.StrictMode>
  );
}