import { App } from "App";
import { DarkModeProvider, ToastProvider } from "contexts";
import { CollapseMenuProvider } from "contexts/CollapseMenuContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "stores";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <CollapseMenuProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </CollapseMenuProvider>
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);
