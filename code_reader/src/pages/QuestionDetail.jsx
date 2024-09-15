import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionDetail} from '../api/questionAnswer';
import '../css/QuestionDetail.module.css';


const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    getQuestionDetail(id).then((response) => {
      setQuestion(response.data);
      }
    )
  
  }, [id]);

  if (!question) {
    return <div>加载中...</div>;
  }

  return (
    <div className="question-detail">
      <h1>{question.title}</h1>
      <div dangerouslySetInnerHTML={{__html: question.content}}></div>
    </div>
  );
};

export default QuestionDetail;