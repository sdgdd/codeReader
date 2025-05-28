import React, { useEffect, useState } from "react";
import { Flex, Tag } from "antd";
import { tagColors } from "../untils/emu";
import { fetchTypes } from "../redux/typeSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "../css/TagList.module.css";

export default function TagList({ onSelect, title }) {
    let dispatch = useDispatch();
    let typeList = useSelector((state) => state.type.list);
    let [selectedTag, setSelectedTag] = useState({});

    function handleClick(item) {
        onSelect?.(item);
        setSelectedTag(item);
    }

    useEffect(() => {
        if (typeList?.length) {
            return;
        }
        dispatch(fetchTypes());
        // eslint-disable-next-line
    }, []);

    return (
        <section className={style.filterSection}>
            <div className={style.searchBox}>
                <form action="#" method="get">
                    <input type="text" className={style.searchInput} placeholder="输入关键词搜索文章..." />
                    <button type="submit" className={style.searchButton}>
                        搜索
                    </button>
                </form>
            </div>
            <div className={style.tagCloud}>
                <h3>按标签筛选</h3>
                <div className={style.tags}>
                    <span className={`${style.tag}`}  onClick={() => { handleClick('全部') }}>全部</span>
                    {typeList.map((item, index) => (
                        <span
                            key={index}
                            checked={item.name === selectedTag.name}
                            onClick={() => handleClick(item)}
                            className={
                                item.name === selectedTag.name ? `${style.tag} ${style.active}` : style.tag
                            }
                        >
              {item.name}
            </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
