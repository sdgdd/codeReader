import LoginFrom from "../components/LoginFrom";
import React from "react";
import ReactDOM from "react-dom/client";
import zh_CN from "antd/locale/zh_CN";
// for date-picker i18n
import "dayjs/locale/zh-cn";
import {ConfigProvider} from "antd";
import store from "../redux/store";
import {Provider} from "react-redux";


export function createLonginDialog() {
    const root = ReactDOM.createRoot(document.getElementById("login-modal"),{});
    root.render(
        <Provider store={store}>
            <ConfigProvider locale={zh_CN}>
                <LoginFrom isOpenModal={true} setOpenModal={() => {
                root.unmount()
            }}/>
            </ConfigProvider>
        </Provider>
    );
}


