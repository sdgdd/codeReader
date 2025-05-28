import React from "react";
import {NavLink} from "react-router-dom";
import styles from "../css/NavHeader.module.css";
import LoginAvatar from "./LoginAvatar";

export default function NavHeader() {
    return (
        <header>
            <div className={`${styles.container} ${styles.headerContainer}`}>
                <a href="#" className={styles.logo}>我的博客</a>
                <nav>
                    <ul>
                        <li>
                            <NavLink className={styles.navLlink} to="/answer">
                                首页
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navLlink} to="/faceQuestion">
                                面试题
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navLlink} to="/videoTeach">
                                视频教程
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navLlink} to="/books">
                                书籍
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navLlink} to="/about">
                                关于我
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        // <LoginAvatar></LoginAvatar>
    );
}
