import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import zh_CN from "antd/locale/zh_CN";
// for date-picker i18n
import "dayjs/locale/zh-cn";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zh_CN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
