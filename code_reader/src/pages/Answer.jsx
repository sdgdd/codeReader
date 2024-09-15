import React, { useEffect, useState } from "react";
import { Button, Col, Flex, message,Pagination  } from "antd";
import { getQuestion } from "../api/questionAnswer";
import { useNavigate } from "react-router-dom";
import style from "../css/Answer.module.css";
import TagList from "../components/TagList";
import { useSelector } from "react-redux";
import QuesiontItem from "../components/QuestionItem";

export default function Answer() {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const { tagMap } = useSelector((state) => state.type);
  const {isLogin} = useSelector((state) => state.user);
  const [tagId, setTagId] = useState();

  //初始化时调用
  useEffect(() => {
    getQuestion(5,1,tagId).then((res) => {
      if (!res.data?.rows || res.data?.rows?.length === 0) {
        return
      }
      setQuestionList(res.data)
      console.log(res)
    })

  }, [tagMap])


  const handlePageChange = (page, pageSize) => {
    getQuestion(pageSize, page,tagId).then((res) => {
      if (!res.data?.rows || res.data?.rows?.length === 0) {
        return
      }
      setQuestionList(res.data)
    })
  }

  const handleClick = () => {
    if(!isLogin){
      message.warning("请先登录");
      return;
    }
    navigate('/addQuestion')
  }


  return (
    <div className={style.answer}>
      <TagList title="问答列表" onSelect={setTagId}></TagList>
      <Flex gap="64px">
        <div style={{ flex: 1 }}>
        <div>
        <Col>
          {
           questionList?.rows?.map((item, index) => {
              return (<QuesiontItem data={{answerCount:item.answerCount || index, viewCount:item.viewCount || index, title:item.title, tags:item.Tags || "js", nickName:item.nickName || "测试", createdAt:item.createdAt}}></QuesiontItem>)
            })
          }
        </Col>
         
        </div>

        <div>
          <Pagination pageSizeOptions={[5,10,20]}  defaultPageSize={"5"} showQuickJumper={true} showSizeChanger defaultCurrent={questionList.pageNumber} total={questionList.count} onChange={handlePageChange} />
        </div>
        
        </div>
        <div>
          <Button type="primary" style={{ width: "300px" }} onClick={handleClick}>我要提问</Button>
          <div>
            推荐内容
          </div>
        </div>
      </Flex>
    </div>
  )
}