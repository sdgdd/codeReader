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
  const [page, setPage] = useState({pageNumber:1,pageSize:5});

  //初始化时调用
  useEffect(() => {
    getQuestion(5,1,tagId?.id).then((res) => {
      if (!res.data?.rows || res.data?.rows?.length === 0) {
        return
      }
      setQuestionList(res.data)
    })

  }, [tagMap,tagId])

  useEffect(() => {
    getQuestion(page.pageSize, page.pageNumber,tagId?.id).then((res) => {
      if (!res.data?.rows || res.data?.rows?.length === 0) {
        return
      }
      setQuestionList(res.data)
    })
  },[page])

  function handleDetail(data){
    navigate(`/questionDetail/${data.id}`, {state: {id: data.id}})
  }


  const handlePageChange = (page, pageSize) => {
    setPage({pageNumber:page,pageSize:pageSize})
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
              return (<QuesiontItem onTitleClick={()=>{handleDetail(item)}} data={{answerCount:item.answerCount || index, viewCount:item.viewCount || index, title:item.title, tags:item.Tags, nickName:item.nickName, createdAt:item.createdAt}}></QuesiontItem>)
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