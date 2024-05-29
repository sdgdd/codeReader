import React from "react";
import { Button, Avatar, Popover, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function LoginAvatar() {
  const user = useSelector((state) => state.user);

  const avatar = <Avatar size="large" icon={<UserOutlined />}></Avatar>;

  const dropDownOption = (
    <List
      dataSource={["个人中心", "退出登录"]}
      renderItem={(item) => (
        <List.Item style={{ cursor: "pointer" }}>{item}</List.Item>
      )}
    ></List>
  );

  const hasLogin = (
    <Popover content={dropDownOption} placement="bottom">
      {avatar}
    </Popover>
  );

  const notLogin = <Button type="primary">注册/登录</Button>;

  return <div>{user.isLogin ? hasLogin : notLogin}</div>;
}
