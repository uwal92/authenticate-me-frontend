import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./store/store";

// frontend/src/main.jsx

import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { Modal, ModalProvider } from "./context/Modal";

const store = configureStore();

// Store setup
if (import.meta.env.MODE !== "production") {
  console.log("sstest")
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// frontend/src/main.jsx

// ...

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

// frontend/src/main.jsx

// ...
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
