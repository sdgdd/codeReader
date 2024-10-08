import React, { useEffect, useState } from "react";
import { Button, message, Form, Input, Select, Tag } from "antd";
import { addQuestion, getQuestion } from "../api/questionAnswer";
import { useSelector } from "react-redux";
import { tagColors } from "../untils/emu"
import Editor from "../components/MarkDownEditor";


export default function Answer() {

  let tagList = useSelector(state => state.type.list);
  let [editorValue, setEditorValue] = useState("");

  const options = tagList.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  })


  //初始化时调用
  useEffect(() => {
    getQuestion().then((res) => {
      console.log(res)
    })
  }, [])


  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={tagColors[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginInlineEnd: 4,
        }}
      >
        {label}
      </Tag>
    );
  };


  const onFinish = (values) => {
    console.log('Success:', values,editorValue);
    addQuestion({ ...values ,content:editorValue }).then((res) => {
      if (res.code !== 200) {
        message.error(res.message)
      } else {
        message.success("新增成功")
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo,editorValue);
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
          maxWidth: '80%',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          label="语言类型"
          name="tag"
          rules={[
            {
              required: true,
              message: '请选择标签!',
            },
          ]}
        >
          <Select
            size="large"
            tagRender={tagRender}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入标题!',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[
            {
              validator: async (_, value) => {
                if(!editorValue){
                  return  Promise.reject(new Error('请输入问题内容!'))
                }
              }
            }
          ]}
        >
          <Editor setEditorValue={setEditorValue} initialEditType="wysiwyg"></Editor>
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
    <div style={{ marginTop: '36px' }}>
      <div>
        {questionInput}
      </div>
    </div>);
}
