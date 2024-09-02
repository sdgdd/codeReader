import React from "react";
import { Button, Avatar, Popover, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector,useDispatch } from "react-redux";
import {clearUserInfo} from '../redux/userSlice'
export default function LoginAvatar({ setOpenModal }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const avatar = <Avatar size="large" icon={<UserOutlined />}></Avatar>;

  const handleClick = (item)=>{
    if(item === "退出登录"){
      dispatch(clearUserInfo());
      document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      return
    }
  }

  const dropDownOption = (
    <List
      dataSource={["个人中心", "退出登录"]}
      renderItem={(item) => (
        <List.Item style={{ cursor: "pointer" }} onClick={()=>{handleClick(item)}}>{item}</List.Item>
      )}
    ></List>
  );

  const hasLogin = (
    <Popover content={dropDownOption} placement="bottom" >
      {avatar}
    </Popover>
  );

  const notLogin = (
    <Button
      type="primary"
      onClick={() => {
        setOpenModal(true);
      }}
    >
      注册/登录
    </Button>
  );

  return <div>{user.isLogin ? hasLogin : notLogin}</div>;
}
