import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import CustomRouter from "./CustomBrowserRouter";
import history from "./history";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </CustomRouter>
  </React.StrictMode>
);
