import React from "react";
import { Modal, message } from "antd";
import { Radio, Form, Input, Checkbox, Button, Flex } from "antd";
import "../css/LoginFrom.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initUserInfo } from "../redux/userSlice";
import { longin, regist, getcaptcha } from "../api/loign";

export default function LoginFrom({ setOpenModal, isOpenModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const [captcha, setCapcha] = useState("");

  const fetchCapcha = async () => {
    const result = await getcaptcha();
    setCapcha(result.data);
  };
  useEffect(() => {
    fetchCapcha();
  }, [isOpenModal]);

  const onFinish = async (values) => {
    const result = await longin(values);
    if (result.code === 200) {
      dispatch(initUserInfo({ urser: result.message.token }));
      setOpenModal(false);
    } else {
      message.warning(result.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRegistFinish = async (values) => {
    const result = await regist(values);
    if (result.code === 200) {
      dispatch(initUserInfo({ urser: result.message.token }));
      setOpenModal(false);
    } else {
      message.warning(result.message);
    }
  };

  const registFrom = (
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
      onFinish={onRegistFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="账号"
        name="userName"
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
        label="密码"
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
        label="密码确认"
        name="comfirPassword"
        rules={[
          {
            required: true,
            message: "请确认密码!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("密码不一致!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className="login-button">
          注册
        </Button>
        <Button type="primary" htmlType="reset">
          重置
        </Button>
      </Form.Item>
    </Form>
  );

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
        name="userName"
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
        label="验证码"
        name="captcha"
        rules={[
          {
            required: true,
            message: "请输入验证码!",
          },
        ]}
      >
        <Flex gap="small">
          <Input style={{ height: 32 }} />
          <div
            dangerouslySetInnerHTML={{ __html: captcha }}
            onClick={fetchCapcha}
          ></div>
        </Flex>
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
