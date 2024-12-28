import React, { useEffect, useState } from "react";
import { Button, Col, Flex, message, Pagination ,Spin,Empty } from "antd";
import { getQuestion } from "../api/questionAnswer";
import { useNavigate } from "react-router-dom";
import style from "../css/Answer.module.css";
import TagList from "../components/TagList";
import { useSelector } from "react-redux";
import QuesiontItem from "../components/QuestionItem";

export default function Answer() {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { tagMap } = useSelector((state) => state.type);
  const { isLogin } = useSelector((state) => state.user);
  const [tagId, setTagId] = useState();
  const [page, setPage] = useState({ pageNumber: 1, pageSize: 5 });

  const fecthhData = async (page, tagId) => {
    setLoading(true);
    const res = await getQuestion(page.pageSize, page.pageNumber, tagId?.id)
    setLoading(false);
    if (!res.data?.rows) {
      return
    }
    setQuestionList(res.data)
  }


 const handleTagChange = (tagId) => {
    setPage({ pageNumber: 1, pageSize: 5 })
    setTagId(tagId)
 }

  //初始化时调用
  useEffect(() => {
    fecthhData(page, tagId)
  }, [tagId, page])

  function handleDetail(data) {
    navigate(`/questionDetail/${data.id}`, { state: { id: data.id } })
  }


  const handlePageChange = (page, pageSize) => {
    setPage({ pageNumber: page, pageSize: pageSize })
  }

  const handleClick = () => {
    if (!isLogin) {
      message.warning("请先登录");
      return;
    }
    navigate('/addQuestion')
  }

  const content = () => {
    if(Number(questionList?.rows?.length) === 0) {
      return <Empty description="暂无数据" />
    }else {
      return questionList?.rows?.map((item, index) => {
        return (<QuesiontItem upDateContent={()=> fecthhData(page, tagId)} key={item.id} onTitleClick={() => { handleDetail(item) }} data={{answerCount: item.answerCount || index, viewsCount: item.viewsCount || index, title: item.title, tags: item.Tags, nickName: item.nickName, createdAt: item.createdAt ,...item}}></QuesiontItem>)
      })
    }
  }

  return (
    <div className={style.answer}>
      <TagList title="问答列表" onSelect={handleTagChange} ></TagList>
      <Flex gap="64px">
        <div style={{ flex: 1,marginTop: "24px" }}>
          <Spin spinning={loading}>
            <Col>
              {content() }
            </Col>
          </Spin>

          <div>
            <Pagination pageSizeOptions={[5, 10, 20]} defaultPageSize={"5"} showQuickJumper={true} showSizeChanger defaultCurrent={questionList.pageNumber} total={questionList.count} onChange={handlePageChange} />
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