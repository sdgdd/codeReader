import React from "react";
import { Flex, Tag,Row } from "antd";
import { tagColors } from "../untils/emu"
import { useSelector } from "react-redux";
import style from '../css/QuestionItem.module.css'
import dayjs from "dayjs";


export default function QuesiontItem({data}) {
  const { tagMap } = useSelector((state) => state.type);

  const {answerCount, viewCount, title, tags, nickName, relaseTime} = data
    return(
      <Flex gap="64px" justify="center" className={style.cardItem}>
        <Flex vertical gap="small" align="center" justify="center"  className={style.shallowText}>
          <div>{answerCount}</div>
          <div>回答</div>
        </Flex>
        <Flex gap="small" vertical align="center" justify="center"  className={style.shallowText}>
          <div>{viewCount}</div>
          <div>浏览</div>
        </Flex>
        <Flex gap="small" vertical>
          <Row className={style.twoRowEllipsis}>{title}</Row>
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