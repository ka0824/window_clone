import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store/store";

// React.StrictMode를 주석 처리한 이유
// 현재 프로젝트에서 react-dnd 라이브러리를 사용하고 있습니다.
// React.StrictMode에서는 해당 라이브러리의 드래그 기능을 사용할 때 충돌하는 경우가 있어, 주석 처리하였습니다.

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
