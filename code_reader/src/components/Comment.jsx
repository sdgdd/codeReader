import React from 'react'
import style from '../css/Comment.module.css'
import { Avatar, Popover } from 'antd';
import { Viewer } from '@toast-ui/react-editor';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import zh from 'dayjs/locale/zh';
import dayjs from 'dayjs';
import { UserOutlined } from "@ant-design/icons";
import opter from "../asset/img/opter.png"

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('zh', zh);

export default function Comment({ userName, comment, date }) {

  
    const content = (
        <div>
            <p>Author: {userName}</p>
            <p>Comment: {comment}</p>
            <p>Date: {date}</p>
        </div>
    );

    const opterion = 
         (
            <Popover content={content} title="Title">
                <img height="100%" src={opter} alt='' />
            </Popover>

        )
    

    return (
        <div className={style.comment}>
            <div className={style.topHeader}>
                <Avatar size="large" icon={<UserOutlined />} />
                <div className={style.userName}>{userName}</div>
                <div>{dayjs(date).fromNow()}</div>
                <div className={style.opterImg}>{opterion}</div>
            </div>
            <div className={style['comment-content']}>
                <Viewer initialValue={comment}></Viewer>
            </div>
        </div>
    )
}
