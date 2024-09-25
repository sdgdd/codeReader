import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionDetail,getComment} from '../api/questionAnswer';
import style from '../css/QuestionDetail.module.css';
import '@toast-ui/editor/dist/toastui-editor.css'; 
import { Viewer} from '@toast-ui/react-editor';
import {Divider ,Button,message} from 'antd';
import {addCommen} from '../api/questionAnswer';
import Editor from "../components/MarkDownEditor";
import Comment from '../components/Comment';



const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  let [editorValue, setEditorValue] = useState("");
  const [comment, setComment] = useState([]);

  useEffect(() => {
    getQuestionDetail(id).then((response) => {
      setQuestion(response.data);
      }
    )

    getComment(id).then((response) => {
      setComment(response.data);
    })

  
  }, [id]);


  const addComment = () => {
    if (!editorValue) {
      message.error('请输入评论内容');
      return;
    }
    addCommen({questionId:id, content:editorValue}).then((response) => {
      if(Number(response.code) !== 200){
        return message.error(response.message);
      }else{
        message.success('评论成功');
        setEditorValue("");

      }
    });
  }

  if (!question) {
    return <div>加载中...</div>;  
  }

  return (
    <div className={style["question-detail"]  }>
      <h1>{question.title}</h1>
      <Viewer initialValue={question.content}></Viewer>
      <Divider style={{  borderColor: '#7cb305' }} orientation="left">评论区</Divider>
      <div className={style.editor}>
         <Editor setEditorValue={setEditorValue} />
         <Button style={{width:"100px",marginLeft:"auto",marginBottom:"16px"}} type="primary" onClick={addComment}>添加评论</Button>
      </div>
      <div>
      {comment?.rows?.map((item)=>{
        return <Comment comment={item.content} date={item.createTime} userName={item.Admin.name} key={item.id} > </Comment>
      })}
      </div>
    </div>
  );  
};

export default QuestionDetail;