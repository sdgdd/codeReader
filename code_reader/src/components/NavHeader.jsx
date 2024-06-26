import React from "react";
import { Image, Flex, Space, Select, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import canghai from "../asset/img/canghai.png";
import yisu from "../asset/img/yisu.png";
import styles from "../css/NavHeader.module.css";
import LoginAvatar from "./LoginAvatar";
export default function NavHeader({ setOpenModal }) {
  const options = [
    {
      value: "zhejiang",
      label: "问答",
    },
    {
      value: "jiangsu",
      label: "面试题",
    },
  ];

  const inputStyle = {
    height: "32px",
    minWidth: "320px",
  };

  return (
    <Flex wrap={false} gap={64} align="center" justify="center">
      <div className="nav-img">
        <Image width={80} height={48} preview={false} src={canghai} />
        <Image width={80} height={48} preview={false} src={yisu} />
      </div>
      <Flex gap={32} wrap className="link-choose">
        <NavLink className={styles.navLlink} to="/answer">
          问答
        </NavLink>
        <NavLink className={styles.navLlink} to="/books">
          书籍
        </NavLink>
        <NavLink className={styles.navLlink} to="/faceQuestion">
          面试题
        </NavLink>
        <NavLink className={styles.navLlink} to="/videoTeach">
          视频教程
        </NavLink>
      </Flex>

      <Space.Compact>
        <Select
          defaultValue="问答"
          options={options}
          style={{ minWidth: "100px" }}
        />
        <Input
          defaultValue=""
          size="small"
          placeholder="请输入要搜索的内容"
          style={inputStyle}
        />
        <Button type="primary">搜索</Button>
      </Space.Compact>

      <LoginAvatar setOpenModal={setOpenModal}></LoginAvatar>
    </Flex>
  );
}
