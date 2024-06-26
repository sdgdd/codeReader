import React from "react";
import { Modal } from "antd";
import { Radio, Form, Input, Checkbox, Button } from "antd";
import "../css/LoginFrom.css";
import { useState } from "react";
export default function LoginFrom({ setOpenModal, isOpenModal }) {
  const [isLogin, setIsLogin] = useState(true);

  const onFinish = (values) => {
    console.log("Success:", values);
    setOpenModal(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const registFrom = <div>注册</div>;

  const longinFrom = (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="登录账号"
        name="username"
        rules={[
          {
            required: true,
            message: "请输入账号!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="登录密码"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入密码!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 4,
          span: 8,
        }}
      >
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className="login-button">
          登录
        </Button>
        <Button type="primary" htmlType="reset">
          重置
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Modal
        title="注册/登录"
        open={isOpenModal}
        footer={null}
        onOk={() => {
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <Radio.Group
          defaultValue="longin"
          buttonStyle="solid"
          size="big"
          style={{ width: "100%" }}
          className="radio-group"
          onChange={(e) => {
            setIsLogin(e.target.value === "longin");
          }}
        >
          <Radio.Button value="longin">登录</Radio.Button>
          <Radio.Button value="regist">注册</Radio.Button>
        </Radio.Group>

        {isLogin ? longinFrom : registFrom}
      </Modal>
    </div>
  );
}
