import React, { useEffect, useState } from "react";
import { Flex, Tag } from "antd";
import { tagColors } from "../untils/emu"
import { fetchTypes } from "../redux/typeSlice"
import { useDispatch, useSelector } from "react-redux";
import style from "../css/TagList.module.css"

export default function TagList({ onSelect, title }) {
  let dispatch = useDispatch();
  let typeList = useSelector(state => state.type.list);
  let [selectedTag, setSelectedTag] = useState({});

  function handleClick(item) {
    onSelect?.(item);
    setSelectedTag(item)
  }

  useEffect(() => {
    if (typeList?.length) {
      return
    }
    dispatch(fetchTypes());
  }, [])

  return (
    <Flex align="center">
      <div className={style.tagListTitle}>
        {title}
      </div>
      <div>
      <Tag style={{ cursor: "pointer",fontSize:"16px",padding:"8px 16px" ,marginRight:"16px"}} color={"black"}  onClick={() => { handleClick('全部') }}>全部</Tag>
        {typeList.map((item, index) => {
          return <Tag key={index} style={{ cursor: "pointer",fontSize:"16px",padding:"8px 16px" ,marginRight:"16px"}} color={tagColors[item.id%tagColors.length]} checked={item.name == selectedTag.name} onClick={() => { handleClick(item) }}>{item.name}</Tag>
        })}
      </div>

    </Flex>)
}