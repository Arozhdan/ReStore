import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import CustomRouter from "./CustomBrowserRouter";
import history from "./history";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const history = createBrowserHistory();

root.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <App />
    </CustomRouter>
  </React.StrictMode>
);
