import React,{useEffect} from "react";
import { Button, message, Form, Input } from "antd";
import { addQuestion, getQuestion } from "../api/loign";

export default function Answer() {
  //初始化时调用
  useEffect(()=>{
    getQuestion().then((res)=>{
      console.log(res)
    })
  },[])

  const onFinish = (values) => {
    console.log('Success:', values);
    addQuestion({...values }).then((res) => {
      if(res.code !== 200){
        message.error(res.message)
      }else{
        message.success("新增成功")
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const questionInput =
    (
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
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
        label="title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input content!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
        提交
        </Button>
      </Form.Item>
    </Form>
    )
  

  return (
  <div>
    <div>
     
      {questionInput}
    </div>
  </div>);
}
