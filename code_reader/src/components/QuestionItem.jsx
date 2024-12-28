import React from "react";
import { Flex, Tag,Row } from "antd";
import { tagColors } from "../untils/emu"
import { useSelector } from "react-redux";
import style from '../css/QuestionItem.module.css'
import dayjs from "dayjs";
import MyIcon from "../components/MyIcon";
import { questionGiveLike, questionGiveDislike} from "../api/questionAnswer";

export default function QuesiontItem({data,onTitleClick,upDateContent}) {
  const { tagMap } = useSelector((state) => state.type);
  const [likesCount,setLikesCount] = React.useState(data.likesCount)
  const [isGveLike,setIsGiveLike]=React.useState(false)

  const handleGiveLikeClick = async () => {
      const fn = isGveLike ? questionGiveDislike : questionGiveLike
      const res= await fn({id:data.id});
      if(res?.code !==200){
          return;
      }
      setIsGiveLike(!isGveLike)
      setLikesCount(isGveLike ? likesCount-1 : likesCount+1)
  }

  const {answerCount, viewsCount, title, tags, nickName, relaseTime} = data
    return(
      <Flex gap="32px" justify="center" className={style.cardItem}>
          <Flex vertical gap="small" align="center" justify="center"  className={style.shallowText}>
              <Flex gap="small" >{likesCount}</Flex>
              <MyIcon onClick={handleGiveLikeClick} name={isGveLike?"giveLike":"iconfontdianzan"} hoverColor="#1296db" size="20px"/>
          </Flex>
        <Flex vertical gap="small" align="center" justify="center"  className={style.shallowText}>
          <div>{answerCount}</div>
            <MyIcon name="huida" size="20px"/>
        </Flex>
        <Flex gap="small" vertical align="center" justify="center"  className={style.shallowText}>
          <div>{viewsCount}</div>
            <MyIcon name="liulanliang" size="20px"/>
        </Flex>
        <Flex gap="small" vertical>
          <Row className={style.twoRowEllipsis} onClick={()=>{onTitleClick(data)}}>{title}</Row>
          <Flex justify="space-between" align="center">
            <Tag className={style.tag} color={tagColors[tagMap[tags] % tagColors.length]}>{tags}</Tag>
            <Row className="question-info" align="center">
              <Tag color="#996e83">{nickName}</Tag>
              <div>{dayjs(relaseTime).format("YYYY-MM-DD")}</div>
            </Row>
          </Flex>
        </Flex>
      </Flex>
    )
}